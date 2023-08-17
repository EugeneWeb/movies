const createPath = require('../helpers/createPath')
const Movie = require('../models/Movie')


const getIndex = (req, res) => {
    const title = 'Все фильмы'
    const correctPath = '.'

    Movie
         .find()
         .then(movies => res.render(createPath('index'), { title, movies, correctPath }))
         .catch((err) => {
            console.log(err)
        
            const title = 'Страница не найдена'
            const correctPath = '.'
        
            res.render(createPath('error'), { title, correctPath })
        })

}

module.exports = {
    getIndex
}
