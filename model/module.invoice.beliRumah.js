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
    noTelepon: {
        type: String,
        required: [true, 'no Telepon harus di isi'],
        validate: {
            validator: (value) => {
                const regegNoTelepon = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
                return regegNoTelepon.test(value)
            },
            message: (props) => `${props.value} no Telepon tidak valid`
        }
    },
    kartuDebit: {
        type: String,
        required: [true, 'kartu Debit harus di isi'],
        enum: ['BRI', 'BCA', 'Mandiri'],
        message: '{VALUE} yang kamu masukan tidak valid'
    },

    noRekening: {
        type: String,
        required: [true, 'no Rekening harus di isi'],
        minlength: [5, 'minimal no Rekening adalah 5 digit angkah'],
        maxlength: [12, 'max no Rekening adalah 12 digit angkah']
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