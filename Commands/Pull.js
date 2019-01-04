const Command = require('../Command')
const fs = require('fs')

module.exports = class PullCommand extends Command {
  constructor() {
    super('pull')
  }

  run(args) {
    // Get promise lines
    const promiseFile = fs.readFileSync(args[0] + '.promise', 'utf8').trim()
    const lines = promiseFile.split('\n')

    // Get cache line
    const cacheValue = fs.existsSync(args[0] + '.promcache')
      ? fs.readFileSync(args[0] + '.promcache', 'utf8').trim()
      : ''

    // Pull data from promise
    let appendLines = ''
    for (let i = lines.length - 1; i > 1; i--) {
      const line = lines[i]
      // Skip merge conflicts
      if (line[0] == '<' || line[0] == '>' || line[0] == '=') continue
      // Reached up to date
      if (line.substr(0, 12) == cacheValue) break
      // Add line to append
      console.log(line)
      appendLines = line.substr(13) + '\n' + appendLines
    }

    // Append new lines to output file
    fs.appendFileSync(`${args[0]}.${lines[0]}`, appendLines)
    // Update cache file
    fs.writeFileSync(
      args[0] + '.promcache',
      lines[lines.length - 1].substr(0, 12)
    )
  }
}
