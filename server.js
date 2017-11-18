const { join } = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(join(__dirname, 'views/partials'))
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('logs/server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to logs/server.log')
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintence.hbs')
// })

app.use(
  express.static(join(__dirname, 'public'))
)

hbs.registerHelper('getCurrentYear', () =>
  new Date().getFullYear()
)

hbs.registerHelper('screamIt', (text) =>
  text.toUpperCase()
)

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle  request'
  })
})

app.use((req, res) => res.status(404).send('404'))

app.listen(3000, () =>
  console.log('Server is running on port 3000')
)
