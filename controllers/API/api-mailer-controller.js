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
    html:`
        <head>
            <style> 
                ul {
                    margin: 0;
                    padding: 0;

                    list-style-type: none;
                }

                .main-title {
                    color: black;
                    font-family: sans-serif;
                }
                .movie-link { 
                    color: black; 
                    font-family: sans-serif;
                    text-decoration: underline; 
                } 
                .movie-text { 
                    color: #242936; 
                }
                
                .movie-content {
                    display: flex;
                }

                .img-wrap {
                    width: 200px;
                    height: 300px;
                }
                
                .img-wrap img {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .movie-info {
                    margin-left: 20px;
                }

            </style>
        </head>
        <body>
        <h2 class="main-title">Здравствуйте, ваш список фильмов:</h2>
        <ul class="movies">`
}



const path = require('path')
const sendMovies = (req, res) => {
    const { gmail } = req.body

    if(gmail == undefined || gmail.length === 0) {
        console.log('Request body doesn\'t have a gmail')
        res.status(404)
        return
    }
    let html = ''

    Movie
         .find()
         .then(movies => {
            mailOptions.attachments = []
            movies.forEach((movie, index) => {
                html += `
                    <li class="movie">
                        <h3 class="movie-title">
                            <a class="movie-link" href="${req.protocol}://${req.get('host')}/movie/${movie.id}">${movie.title}</a>
                        </h3>
                        <div class="movie-content">
                            <div class="img-wrap">
                                <a class="movie-link" href="${req.protocol}://${req.get('host')}/movie/${movie.id}"><img src="cid:image${index}" alt="Картинка ${movie.title}"/></a>
                            </div>

                            <div class="movie-info">
                                <p class="movie-text">Автор: ${movie.author}</p>
                                <p class="movie-text">Рейтинг: ${movie.rating}</p>
                            </div>
                        </div>
                    </li>
                    `
                    mailOptions.attachments.push({
                        filename: `${movie.title}.webp`,
                        path: path.resolve(__dirname, '../../public',movie.poster_url),
                        cid: `image${index}`
                    })
            })
            html += `</ul></body>`

            mailOptions.to = gmail
            mailOptions.html += html
            

            transporter.sendMail(mailOptions, err => err ? console.log(err): null)
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