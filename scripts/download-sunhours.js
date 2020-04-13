const fs = require('fs')
const path = require('path')
const got = require('got')
const { add, format } = require('date-fns')

const lat = 61.747415800000006
const lng = 16.1381005
const formatted = '0'

const startDate = new Date('2020-01-01T00:00:00Z')

async function run() {
  for (let i = 0; i < 365; i++) {
    const date = format(add(startDate, { days: i }), 'yyyy-MM-dd')
    const response = await got('https://api.sunrise-sunset.org/json', {
      searchParams: { lat, lng, date, formatted },
      responseType: 'json',
    })
    fs.writeFileSync(
      path.resolve(`./data/sun-hours/${date}.json`),
      JSON.stringify(response.body, null, 2)
    )
  }
}

run().catch((err) => console.log(err))
