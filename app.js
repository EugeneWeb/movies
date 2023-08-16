const express = require('express')
const app = express()

require('dotenv').config()

app.listen(process.env.PORT, err => console.log(err))

const mongoose = require('mongoose')

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.a1alf18.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose
        .connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        .then(() => console.log(`Connected to ${process.env.DB_NAME}`))
        .catch(err => console.log(err))

app.use(express.static('public'))

app.set('view engine', 'ejs')

const indexRoutes = require('./routes/index-routes')
const movieRoutes = require('./routes/movie-routes')
const genreRoutes = require('./routes/genre-routes')
const apiMovieRoutes = require('./routes/API/api-movie-routes')

app.use(indexRoutes)
app.use(movieRoutes)
app.use(genreRoutes)
app.use(apiMovieRoutes)