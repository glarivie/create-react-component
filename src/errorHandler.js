exports.exitWithMessage = message => {
  console.error(`[Error] ${message}`)
  process.exit(1)
}
