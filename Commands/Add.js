const Command = require('../Command')
const makeid = require('../util/makeid')
const fs = require('fs')

module.exports = class AddCommand extends Command {
  constructor() {
    super('add')
  }

  run(args) {
    // Check if promise exists
    if (!fs.existsSync(args[0] + '.promise')) {
      console.error(`Promise '${args[0]}' doesn't exist`)
      return
    }

    // Create command string
    const commandString = args.splice(1).join(' ')
    // ID is 12 spaces, the rest is the command
    const id = makeid(12)
    const line = id + ' ' + commandString
    console.log(line)

    // Add to promise
    fs.appendFileSync(args[0] + '.promise', line + '\n')

    // Set cache file
    fs.writeFileSync(args[0] + '.promcache', id)
  }
}
