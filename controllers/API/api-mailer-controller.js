const nodemailer = require('nodemailer')
const Movie = require('../../models/Movie')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

const mailOptions = {
    from: process.env.GMAIL,
    to: '',
    subject: 'All movies',
    html:'<head><style> body, h2 { color: black;} a { color: black; text-decoration: underline; } p { color: #242936; }</style></head><body><h2>Здравствуйте, ваш список фильмов:</h2>'
}




const sendMovies = (req, res) => {
    const { gmail } = req.body

    if(gmail == undefined || gmail.length === 0) {
        console.log('Request body doesn\'t have a gmail')
        res.status(404)
        return
    }
    let html = ''

    console.log(req.get('host'))

    Movie
         .find()
         .then(movies => {
            movies.forEach(movie => {
                html += `<h3><a href="${req.protocol}://${req.get('host')}/movie/${movie.id}">${movie.title}</a></h3><p>Автор: ${movie.author}</p><p>Рейтинг: ${movie.rating}</p>`
            })
            html += `</body>`

            mailOptions.to = gmail
            mailOptions.html += html

            transporter.sendMail(mailOptions, err => console.log(err))
            res
                .status(200)
                .json(mailOptions)
         })
         .catch((err) => {
            console.log(err)
        
            const title = 'Страница не найдена'
            const correctPath = '..'
        
            res.render(createPath('error'), { title, correctPath })
        })
}


module.exports = {
    sendMovies
}