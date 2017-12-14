#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')
const { promisify } = require('util')

const { version } = require('../package.json')
const templates = require('../src/templates')
const { checkProgramArguments } = require('../src/check')

program
  .version(version)
  .option('-n, --name <name>', 'Component name', 'Test')
  .option('-d, --dest <path>', 'Specify component destination (default: current path)', process.cwd())
  .option('-F, --statefull', 'Overide default stateless component template', false)
  .option('-X, --redux', 'Connect your component with Redux', false)
  .option('-S, --scss', 'Create SCSS stylesheet', false)
  .parse(process.argv)

const { dest, name, scss, statefull, redux } = program
const destination = path.resolve(dest)
const fullPath = `${destination}/${name}`

// Check program arguments
checkProgramArguments(name, destination) // Exit program on check failed

// Create component folder
fs.mkdirSync(fullPath)

// Create component index file
fs.writeFileSync(`${fullPath}/index.js`, templates.generateIndex(name))

// Create stylesheet file
fs.writeFileSync(`${fullPath}/${name}.css`, templates.generateStylesheet(name))

if (program.scss)
  fs.writeFileSync(`${fullPath}/${name}.scss`, templates.generateStylesheet(name))

// Create component file
fs.writeFileSync(`${fullPath}/${name}.js`, templates.generateComponent(name, Boolean(statefull), Boolean(redux)))

promisify(exec)(`ls -l ${fullPath}`)
  .then(({ stdout }) => {
    console.log(`Successfully created component at ${fullPath}`)
    console.log(stdout)
  })
  .catch(console.error)
