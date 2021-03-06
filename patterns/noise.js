const chalk = require('chalk')

const numRows = process.argv[2] // 60
const numCols = process.argv[3] // 60

function noise() {
  let output = ''
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      output += Math.random() > 0.5 ? chalk.bgBlack(' ') : chalk.bgWhite(' ')
    }
    output += '\n'
  }
  return output
}

console.log(noise())
