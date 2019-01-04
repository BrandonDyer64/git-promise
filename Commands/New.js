const Command = require('../Command')
const fs = require('fs')

module.exports = class NewCommand extends Command {
  constructor() {
    super('new')
  }
  run(args) {
    // Check if promise already exists
    if (fs.existsSync(args[0] + '.promise')) {
      console.error('Promise already exists')
      return
    }
    // Create promise file
    fs.writeFileSync(args[0] + '.promise', args[1] + '\n')
    // Create cache file
    fs.writeFileSync(args[0] + '.promcache', '')
    // Add files to gitignore
    fs.appendFileSync(
      '.gitignore',
      `${args[0]}.promcache\n` + `${args[0]}.${args[1]}\n`
    )
  }
}
