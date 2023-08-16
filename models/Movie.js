const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    storyline: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    poster_url: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie