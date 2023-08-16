const Movie = require('../../models/movie')
const handleError = require('../../helpers/handleError')

const getMovies = (req, res) => {

    if(req.query.search)
    {
        const regex = new RegExp(`^${req.query.search}`, 'i')
    Movie
         .find({title: regex})
         .then(movies => {
            res
                .status(200)
                .json(movies)
        })
         .catch(handleError)
    }
}

module.exports = {
    getMovies
}