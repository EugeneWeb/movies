const express = require('express')
const router = express.Router()
const { getMovies } = require('../../controllers/API/api-movie-controller')

router.get('/api/movies', getMovies)

module.exports = router