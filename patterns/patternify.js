const fs = require('fs')
const chalk = require('chalk')

const WHITE = chalk.bgWhite(' ')
const GRAY = chalk.bgGray(' ')

const data = fs.readFileSync(0, 'utf-8')

const lines = data.split('\n')
lines.forEach((line) => {
  const stitches = line.split('')
  const linePattern = stitches.map((x) => {
    if (x === '.') {
      return GRAY
    }
    return WHITE
  })
  console.log(linePattern.join(''))
})
