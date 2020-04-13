const chalk = require('chalk')
// const got = require('got')
const { add, format } = require('date-fns')
const _ = require('lodash')

const BLACK = chalk.bgBlack(' ')
const YELLOW = chalk.bgYellow(' ')

const startDate = new Date('2020-01-01T00:00:00Z')
const daysPerRow = 10
const numRows = Math.floor(365 / daysPerRow)

// const lat = 61.747415800000006
// const lng = 16.1381005

function charToStitch(char) {
  if (char === 'x') {
    return YELLOW
  }
  return BLACK
}

async function createPattern() {
  const lines = []
  for (let i = 0; i < numRows; i++) {
    const dayDate = add(startDate, { days: i * daysPerRow })
    const date = format(dayDate, 'yyyy-MM-dd')
    // const formatted = '0'

    // const url = `https://api.sunrise-sunset.org/json?lat=${lat}&long=${lng}&date=${date}`
    // console.log({ url })
    // const sunHours = await got('https://api.sunrise-sunset.org/json', {
    //   searchParams: { lat, lng, date, formatted },
    //   responseType: 'json',
    // })
    const sunHours = require(`../data/sun-hours/${date}.json`)
    // console.log(sunHours.body)

    const { sunrise, sunset } = sunHours.results

    const stitches = []
    for (let h = 0; h < 24; h++) {
      const hourDate = add(dayDate, { hours: h })
      // console.log(hourDate)
      if (new Date(sunrise) < hourDate && hourDate < new Date(sunset)) {
        stitches.push('x')
      } else {
        stitches.push('.')
      }
    }
    lines.push(stitches)
  }

  const allStitches = lines.reduce((acc, stitches) => acc.concat(stitches), [])
  const stitchesInRows = _.chunk(allStitches, 30)
  const str = stitchesInRows
    .map((stitches) => stitches.map((x) => charToStitch(x)).join(''))
    .join('\n')
  console.log(str)
}

createPattern().catch((err) => console.log(err))
