const express = require('express')
const router = express.Router()
const { getGenre } = require('../controllers/genre-controller')

router.get('/movies/:genre', getGenre)

module.exports = router