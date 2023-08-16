const Movie = require('../models/Movie')
const createPath = require('../helpers/createPath')
const handleError = require('../helpers/handleError')

const getMovie = (req, res) => {
    const correctPath = '..'
    Movie
         .findById(req.params.id)
         .then(movie => res.render(createPath('movie'), { movie, correctPath }))
         .catch(handleError)
}

module.exports = {
    getMovie
}
