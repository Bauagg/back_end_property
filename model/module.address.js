const mongoose = require('mongoose')

const moduleAddress = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'name harus di isi'],
    },
    kota: {
        type: String,
        required: [true, 'kota harus di isi']
    },
    provinsi: {
        type: String,
        required: [true, 'provinsi harus di isi'],
    },
    alamatDetail: {
        type: String
    }
})

const Address = mongoose.model('Address', moduleAddress)

module.exports = Address