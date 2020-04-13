const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const child_process = require('child_process')
const util = require('util')

const exec = util.promisify(child_process.exec)

const WHITE = chalk.bgWhite(' ')
const BLACK = chalk.bgBlack(' ')

const patternPath = process.argv[2]
const data = fs.readFileSync(patternPath, 'utf-8')

function getStitchesFromLine(line) {
  return line
    .split(/\[49m/)
    .filter((x) => x)
    .map((x) => `${x}[49m`)
}

async function explainStitchAt(index) {
  const row = Math.floor(index / 100)
  const col = index % 100

  if (col === 0) {
    await exec('say -v Veena -r 100 new row')
  }

  const line = data.split('\n')[row]
  // console.log(line.split(''))
  const stitch = getStitchesFromLine(line)[col]
  // const stitch = line.split('')[col]
  // console.log({ row, col })
  console.log(stitch)
  console.log()

  if (stitch === WHITE) {
    exec('say -v Veena -r 100 white')
  } else if (stitch === BLACK) {
    exec('say -v Veena -r 100 black')
  }
}

let currentStitchIndex = -1

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } else if (key.name === 'right') {
    currentStitchIndex++
    explainStitchAt(currentStitchIndex)
  }
})

// let currentStitchIndex = -1

// const lines = data.split('\n')
// lines.forEach((line) => {
//   const stitches = getStitchesFromLine(line)
//   console.log(stitches)
//   stitches.forEach((stitch) => {
//     console.log('stitch:', stitch)
//     if (stitch === WHITE) {
//       console.log('white')
//     } else if (stitch === GRAY) {
//       console.log('gray')
//     }
//   })
// })
