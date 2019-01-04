const commands = require('./Commands/Commands')

const args = process.argv.slice(2)

if (args[0] in commands) {
  commands[args[0]].run(args.slice(1))
} else {
  console.log(`No command '${args[0]}'`)
}
