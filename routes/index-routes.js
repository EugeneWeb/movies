const express = require('express')
const router = express.Router()
const { getIndex } = require('../controllers/index-controller')

router.get('/', getIndex)
router.get('/home', getIndex)
router.get('/movies', getIndex)
router.get('/index.html', getIndex)

module.exports = router