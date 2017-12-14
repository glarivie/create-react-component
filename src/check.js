const fs = require('fs')

const { exitWithMessage } = require('./errorHandler')

exports.checkProgramArguments = (name, destination) => {
  // Check if name params is undefined
  if (typeof name !== 'string')
    return exitWithMessage('Component name is a required parameter (pop --help)')

  // Check if Component name start with an uppercase letter
  if (name[0] !== name[0].toUpperCase())
    return exitWithMessage('Component name should start with a capital letter')

  // Check if destination exists
  if (!fs.existsSync(destination))
    return exitWithMessage(`Location ${destination} does not exists`)

  // Check if component folder is available
  if (fs.existsSync(`${destination}/${name}`))
    return exitWithMessage(`File ${name} already exists at ${destination}`)
}
