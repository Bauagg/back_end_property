const mongoose = require('mongoose')

const modelSewaRumah = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: String,
        required: [true, 'start Date harus di isi']
    },
    endDate: {
        type: String,
        required: [true, 'Date terahir penyewaan harus di isi']
    }
})

const CartSewaRumah = mongoose.model('CartSewaRumah', modelSewaRumah)

module.exports = CartSewaRumah