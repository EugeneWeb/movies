const express = require('express')
const router = express.Router()

const { sendMovies } = require('../../controllers/API/api-mailer-controller')

router.post('/api/send-movies', sendMovies )

module.exports = router