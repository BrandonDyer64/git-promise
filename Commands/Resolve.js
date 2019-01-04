const Command = require('../Command')
const fs = require('fs')

module.exports = class ResolveCommand extends Command {
  constructor() {
    super('resolve')
  }
  run(args) {
    const promiseFile = fs.readFileSync(args[0] + '.promise', 'utf8')
    const extension = promiseFile.split('\n')[0]
    fs.writeFileSync(args[0] + '.' + extension, '')
  }
}
