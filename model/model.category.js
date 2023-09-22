const mongoose = require('mongoose')

const modelCategory = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi'],
        minlength: [3, 'min karakter adalah 3 karakter']
    }
})

const Category = mongoose.model('Category', modelCategory)

module.exports = Category