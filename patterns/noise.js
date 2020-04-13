const chalk = require('chalk')

const numRows = 60
const numCols = 60

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
