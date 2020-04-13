const chalk = require('chalk')
const _ = require('lodash')

const numRows = Number(process.argv[3]) || 80
const numCols = Number(process.argv[4]) || 100
const invert = process.argv[5] ? true : false

const white = chalk.bgWhite(' ')
const gray = chalk.bgGray(' ')
const magenta = chalk.bgMagenta(' ')
const yellow = chalk.bgYellow(' ')
const blue = chalk.bgBlueBright(' ')

const fn = process.argv[2]

function toRange(value, fromLower, fromUpper, toLower, toUpper) {
  return (
    ((value - fromLower) * (toUpper - toLower)) / (fromUpper - fromLower) +
    toLower
  )
}

function wat1() {
  const pattern = [
    (row, col, i) => (i % 3 === 0 ? white : gray),
    (row, col) => (Math.random() > col / numCols ? white : gray),
  ]
  const stitches = _.range(0, numRows * numCols).map((i) =>
    pattern[i % pattern.length](Math.floor(i / numCols), i % numCols, i)
  )
  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')
  return output
}

function wat2() {
  const pattern = [
    // (row, col, i) => (i % 3 === 0 ? white : gray),
    (row, col, i) =>
      Math.random() *
        toRange(Math.sin((4 * i) / (numCols * numRows)), -1, 1, 0, 1) >
      col / numCols
        ? white
        : gray,
  ]
  const stitches = _.range(0, numRows * numCols).map((i) =>
    pattern[i % pattern.length](Math.floor(i / numCols), i % numCols, i)
  )
  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')
  return output
}

function wat3() {
  const patternA = [white, gray, gray, white, gray]
  const patternB = [white, white, gray, white, gray, gray, gray]
  const patternC = [white, gray, gray, white, gray, white, gray, white, white]
  const patterns = [patternA, patternB, patternC]

  let stitches = []
  let pattern = patterns[0]
  while (stitches.length < numRows * numCols) {
    stitches = [...stitches, ...pattern]
    pattern = patterns[(patterns.indexOf(pattern) + 1) % patterns.length]
  }
  stitches = stitches.slice(0, numRows * numCols)

  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')
  return output
}

function wat4() {
  const patternA = [white, gray, gray, white, gray]
  const patternB = [white, white, gray, white, gray, gray, gray]
  const patternC = [white, gray, gray, gray, white, gray, white, white]
  const patterns = [patternA, patternB, patternC]

  let stitches = []
  let pattern = patterns[0]
  let direction = 1
  while (stitches.length < numRows * numCols) {
    stitches = [...stitches, ...pattern]
    const patternIdx = patterns.indexOf(pattern)
    if (patternIdx === patterns.length - 1) {
      direction = -1
    } else if (patternIdx === 0) {
      direction = 1
    }
    pattern = patterns[patternIdx + direction]
  }
  stitches = stitches.slice(0, numRows * numCols)

  const instructions = _.chunk(stitches, numCols)
    .map((row, i) =>
      row.map((stitch) =>
        (i % 2 === 0 && stitch === white) || (i % 2 === 1 && stitch === gray)
          ? 'K'
          : 'P'
      )
    )
    .map((row) =>
      _.chunk(row, 5)
        .map((chunk) => chunk.join(' '))
        .join('   ')
    )
    .join('\n\n')
  console.log(instructions)

  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')
  return output
}

function wat5() {
  const patternA = [white, gray, blue]
  const patternB = [blue, blue, gray, white, gray, blue, gray]
  const patternC = [
    white,
    blue,
    gray,
    blue,
    white,
    blue,
    white,
    white,
    gray,
    blue,
  ]
  const patterns = [patternA, patternB, patternC]

  let stitches = []
  let pattern = patterns[0]
  let direction = 1
  while (stitches.length < numRows * numCols) {
    stitches = [...stitches, ...pattern]
    const patternIdx = patterns.indexOf(pattern)
    if (patternIdx === patterns.length - 1) {
      direction = -1
    } else if (patternIdx === 0) {
      direction = 1
    }
    pattern = patterns[patternIdx + direction]
  }
  stitches = stitches.slice(0, numRows * numCols)

  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')
  return output
}

function wat6() {
  const patternA = [white, gray, magenta]
  const patternB = [blue, blue, gray, yellow, gray, blue, yellow, white]
  const patternC = [blue, magenta, yellow]
  const patterns = [patternA, patternB, patternC]

  let stitches = []
  let pattern = patterns[0]
  let direction = 1
  while (stitches.length < numRows * numCols) {
    stitches = [
      ...stitches,
      ...pattern,
      // pattern[_.random(0, pattern.length - 1)],
      ...(direction === 1 ? _.reverse(pattern) : pattern),
    ]
    const patternIdx = patterns.indexOf(pattern)
    if (patternIdx === patterns.length - 1) {
      direction = -1
    } else if (patternIdx === 0) {
      direction = 1
    }
    pattern = patterns[patternIdx + direction]
  }
  stitches = stitches.slice(0, numRows * numCols)

  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')

  console.log(
    [
      ...patternA,
      ..._.reverse(patternA),
      ...patternB,
      ..._.reverse(patternB),
      ...patternC,
      ..._.reverse(patternC),
      ...patternB,
      ...patternB,
      ...patternA,
      ...patternA,
    ].join('')
  )
  console.log()

  return output
}

function wat7() {
  const patternA = [white, gray, magenta]
  const patternB = [blue, blue, gray, yellow, gray, blue, yellow, white]
  const patternC = [blue, magenta, yellow]
  const patterns = [patternA, patternB, patternC]

  let stitches = []
  let pattern = patterns[0]
  let direction = 1
  while (stitches.length < numRows * numCols) {
    stitches = [
      ...stitches,
      ...pattern,
      ...(direction === 1 ? _.reverse(pattern) : pattern),
    ]
    const distanceToCenterRow = Math.abs(
      numRows / 2 - Math.floor(stitches.length / numRows)
    )
    const distanceToCenterCol = Math.abs(
      numCols / 2 - (stitches.length % numCols)
    )
    console.log({ distanceToCenterRow, distanceToCenterCol })
    const shouldAddPink =
      distanceToCenterRow / (numRows / 2) +
        distanceToCenterCol / (numCols / 2) <
      1
    if (shouldAddPink) {
      stitches = [...stitches, magenta]
    }
    // if (distanceToCenterRow / (numRows / 2) < 0.25) {
    //   stitches = [...stitches, white]
    // }
    // if (distanceToCenterCol / (numCols / 2) < 0.5) {
    //   stitches = [...stitches, white]
    // }

    const patternIdx = patterns.indexOf(pattern)
    if (patternIdx === patterns.length - 1) {
      direction = -1
    } else if (patternIdx === 0) {
      direction = 1
    }
    pattern = patterns[patternIdx + direction]
  }
  stitches = stitches.slice(0, numRows * numCols)

  const output = _.chunk(stitches, numCols)
    .map((row) => row.join(''))
    .join('\n')

  return output
}

const generators = {
  '1': wat1,
  '2': wat2,
  '3': wat3,
  '4': wat4,
  '5': wat5,
  '6': wat6,
  '7': wat7,
}

console.log(generators[fn]())
