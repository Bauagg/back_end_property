const mongoose = require('mongoose')

const modelCartBeliRumah = mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    qty: {
        type: Number,
        required: [true, 'quantity harus di isi'],
        min: [1, 'minimal quantity adalah 1']
    },
    total: {
        type: Number,
        required: [true, 'total harga harus di isi']
    }
})

const CartBeliRumah = mongoose.model('CartBeliRumah', modelCartBeliRumah)

module.exports = CartBeliRumah