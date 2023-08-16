const createPath = require('../helpers/createPath')
const handleError = require('../helpers/handleError')
const Movie = require('../models/Movie')


const getGenre = (req, res) => {
    const title = 'All movies'
    const correctPath = '..'
    const genre = req.params.genre

    Movie
         .find({genres: genre})
         .then(movies => res.render(createPath('genre'), { title, movies, correctPath, genre}))
         .catch(handleError)

}

module.exports = {
    getGenre
}
