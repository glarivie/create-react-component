const fs = require('fs')

const { exitWithMessage } = require('./errorHandler')

exports.checkProgramArguments = (name, destination) => {
  // Check if name params is undefined
  if (!name)
    exitWithMessage('Component name is a required parameter (pop --help)')

  // Check if Component name start with an uppercase letter
  if (name[0] !== name[0].toUpperCase())
    exitWithMessage('Component name should start with a capital letter')

  // Check if destination exists
  if (!fs.existsSync(destination))
    exitWithMessage(`Location ${destination} does not exists`)

  // Check if component folder is available
  if (fs.existsSync(`${destination}/${name}`))
    exitWithMessage(`File ${name} already exists at ${destination}`)
}
