const mongoose = require('mongoose')

const modelProduct = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi'],
        minlength: [5, 'minimal karakter adalah 5'],
        maxlength: [250, 'max karakter adalah 250']
    },
    kamar_tidur: {
        type: Number,
        min: [1, 'min karakter adalah di isi 1'],
        required: [true, 'kamar tidur harus di isi']
    },
    kamar_mandi: {
        type: Number,
        min: [1, 'min karakter adalah di isi 1'],
        required: [true, 'kamar mandi harus di isi']
    },
    luas_rumah: {
        type: Number,
        min: [1, 'min karakter adalah di isi 1'],
        required: [true, 'luas rumah harus di isi']
    },
    price: {
        type: Number,
        required: [true, 'price harus di isi']
    },
    alamat: {
        type: String,
        required: [true, 'alamat harus di isi']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    image: String
})

const Product = mongoose.model('Product', modelProduct)

module.exports = Product