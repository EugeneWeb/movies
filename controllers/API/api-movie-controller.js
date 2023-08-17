const Movie = require('../../models/Movie')


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
         .catch((err) => {
            console.log(err)
        
            const title = 'Страница не найдена'
            const correctPath = '..'
        
            res.render(createPath('error'), { title, correctPath })
        })
    }
}

module.exports = {
    getMovies
}
