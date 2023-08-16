const express = require('express')
const router = express.Router()

const { getMovie } = require('../controllers/movie-controller')

router.get('/movie/:id', getMovie)

module.exports = router