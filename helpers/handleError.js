const createPath = require("./createPath")

const handleError = err => {
    console.log(err)

    const title = 'Error'
    res.render(createPath('error'), { title })
}

module.exports = handleError