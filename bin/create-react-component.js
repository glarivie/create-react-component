#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')
const { promisify } = require('util')

const { version } = require('../package.json')
const { checkProgramArguments } = require('../src/check')
const templates = require('../src/templates')

program
  .version(version)
  .option('-n, --name <name>', 'Component name')
  .option('-d, --dest <path>', 'Specify component destination (default: current path)', process.cwd())
  .option('-L, --stateless', 'Apply stateless component template', true)
  .option('-F, --statefull', 'Apply statefull component template', false)
  .option('-X, --redux', 'Connect your component with Redux', false)
  .option('-W, --web', 'Create React component', true)
  .option('-N, --native', 'Create React Native component', false)
  .option('-C, --css', 'Create CSS stylesheet', false)
  .option('-S, --scss', 'Create SCSS stylesheet', false)
  .parse(process.argv)

const { dest, name } = program
const destination = path.resolve(dest)
const fullPath = `${destination}/${name}`

// Avoid multiple component types creation
if (program.native) program.web = false
if (program.statefull) program.stateless = false

// Check program arguments
checkProgramArguments(name, destination) // Exit program on check failed

// Create component folder
fs.mkdirSync(fullPath)

// Create component index file
fs.writeFileSync(`${fullPath}/index.js`, templates.generateIndex(name))

if (program.web) {
  let ext = 'css'
  // Create stylesheet file
  if (program.scss) {
    ext = 'scss'
    fs.writeFileSync(`${fullPath}/${name}.scss`, templates.webStylesheet(name))
  }
  if (program.css)
    fs.writeFileSync(`${fullPath}/${name}.css`, templates.webStylesheet(name))

  // Create web component file
  if (program.stateless && !program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statelessWeb(name, ext))

  if (program.stateless && program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statelessWebRedux(name, ext))

  if (program.statefull && !program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statefullWeb(name, ext))

  if (program.statefull && program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statefullWebRedux(name, ext))
}

// Create mobile component file
if (program.native) {
  // Create stylesheet file
  fs.writeFileSync(`${fullPath}/${name}.styles.js`, templates.mobileStylesheet(name))

  // Create mobile component file
  if (program.stateless && !program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statelessMobile(name))

  if (program.stateless && program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statelessMobileRedux(name))

  if (program.statefull && !program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statefullMobile(name))

  if (program.statefull && program.redux)
    fs.writeFileSync(`${fullPath}/${name}.js`, templates.statefullMobileRedux(name))
}

promisify(exec)(`ls -l ${fullPath}`)
  .then(({ stdout }) => {
    console.log(`Successfully created component at ${fullPath}`)
    console.log(stdout)
  })
  .catch(console.error)
