const Movie = require('../models/Movie')
const createPath = require('../helpers/createPath')


const getMovie = (req, res) => {
    const correctPath = '..'
    Movie
         .findById(req.params.id)
         .then(movie => res.render(createPath('movie'), { movie, correctPath }))
         .catch((err) => {
            console.log(err)
        
            const title = 'Страница не найдена'
            const correctPath = '..'
        
            res.render(createPath('error'), { title, correctPath })
        })
}

module.exports = {
    getMovie
}
