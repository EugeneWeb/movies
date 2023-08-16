const createPath = require('../helpers/createPath')
const handleError = require('../helpers/handleError')
const Movie = require('../models/movie')


const getIndex = (req, res) => {
    const title = 'Все фильмы'
    const correctPath = '.'

    Movie
         .find()
         .then(movies => res.render(createPath('index'), { title, movies, correctPath }))
         .catch(handleError)

}

module.exports = {
    getIndex
}