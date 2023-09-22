const mongoose = require('mongoose')

const modelInvoiceSewaRumah = mongoose.Schema({
    sewaRumah: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartSewaRumah'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noTelepon: {
        type: String,
        required: [true, 'noTelepon harus di isi'],
        validate: {
            validator: (value) => {
                const regexNoTelepon = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
                return regexNoTelepon.test(value)
            },
            message: (props) => `${props.value} no telepon tidak valid`
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Confirm", "Cancelled"],
        message: '{VALUE} is not suport',
        default: 'Pending'
    }
})

const InvoiceSewaRumah = mongoose.model('InvoiceSewaRumah', modelInvoiceSewaRumah)

module.exports = InvoiceSewaRumah