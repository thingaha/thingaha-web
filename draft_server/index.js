const express = require('express')
const app = express()
const port = 9000

app.get('/users', (req, res) => {
  const json = require('./users.json')
  res.json(json)
})

app.get('/users', (req, res) => {
  // This endpoint should actually create a user and return user document back
  const json = {
    id: 1,
    user_name: 'naruto',
    email: 'naruto@example.com',
    address: '88, Strand Road, Kyauktada Township, Yangon.',
    role: 'admin',
    country: 'mm',
  }

  res.status(201)
  res.json(json)
})

//GET /donations
// This endpoint should return monthly donations for all donators of the month.
app.get('/donations', (req, res) => {
  const json = require('./donations.json')
  res.json(json)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
