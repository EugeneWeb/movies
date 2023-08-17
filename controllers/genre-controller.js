const createPath = require('../helpers/createPath')
const Movie = require('../models/Movie')


const getGenre = (req, res) => {
    const correctPath = '..'
    let genre = req.params.genre

    Movie
         .find({genres: genre})
         .then(movies => {
            if(!movies.length) throw new Error('Wrong genre selected')

            res.render(createPath('genre'), { movies, correctPath, genre})
          })
         .catch((err) => {
            console.log(err)
        
            const title = 'Страница не найдена'
            const correctPath = '..'
        
            res.render(createPath('error'), { title, correctPath })
        })

}

module.exports = {
    getGenre
}
