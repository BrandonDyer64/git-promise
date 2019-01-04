module.exports = {}

function add(command) {
  const instance = new (require(command))()
  module.exports[instance.name] = instance
}

add('./Add')
add('./New')
add('./Pull')
add('./Resolve')
