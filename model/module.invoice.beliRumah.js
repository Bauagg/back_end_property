const mongoose = require('mongoose')

const modelInvoiceBeliRumah = mongoose.Schema({
    noSeri: {
        type: String,
        required: [true, 'noSeri harus di isi']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartsBeliRumah: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartBeliRumah'
    }],
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    status: {
        type: String,
        enum: ["Pending", "Confirm", "Cancelled"],
        message: '{VALUE} is not suport',
        default: 'Pending'
    }
}, { timestamps: true })

const InvoiceBeliRumah = mongoose.model('Invoice', modelInvoiceBeliRumah)

module.exports = InvoiceBeliRumah