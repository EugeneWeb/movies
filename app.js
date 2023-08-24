const express = require('express')
const app = express()

require('dotenv').config()

app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.listen(process.env.PORT, err => err ? console.log(err) : null)

const ch = require('chalk')
const errorMsg = ch.bgKeyword('white').rgb(256, 0, 0)
const successMsg = ch.bgKeyword('green').white

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.a1alf18.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const mongoose = require('mongoose')
mongoose
        .connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        .then(() => console.log(successMsg(`Connected to ${process.env.DB_NAME}`)))
        .catch(err => console.log(errorMsg(err)))

const indexRoutes = require('./routes/index-routes')
const movieRoutes = require('./routes/movie-routes')
const genreRoutes = require('./routes/genre-routes')
const apiMovieRoutes = require('./routes/API/api-movie-routes')
const apiMailerRoutes = require('./routes/API/api-mailer-routes')

app.use(indexRoutes)
app.use(movieRoutes)
app.use(genreRoutes)
app.use(apiMovieRoutes)
app.use(apiMailerRoutes)

const createPath = require('./helpers/createPath')
app.use((req, res) => {
  const title = 'Страница не найдена'
  const correctPath = '.'

  res
     .status(404)
     .render(createPath('error'), { title, correctPath })
})