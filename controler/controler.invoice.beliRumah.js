const InvoiceBeliRumah = require('../model/module.invoice.beliRumah')
const noResiInvoice = require('../utils/invoicenumber')

const getInvoice = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const newInvoice = await InvoiceBeliRumah.find()
                .populate({
                    path: 'cartsBeliRumah',
                    populate: {
                        path: 'propertyId'
                    }
                })
                .populate('addressId')
                .populate('user', 'name')

            return res.status(200).json({
                error: false,
                message: 'get data invoice success',
                datas: newInvoice
            })
        } else {
            const newInvoice = await InvoiceBeliRumah.find({ user: req.user.id })
                .populate({
                    path: 'cartsBeliRumah',
                    populate: {
                        path: 'propertyId'
                    }
                })
                .populate('addressId')
                .populate('user', 'name')

            return res.status(200).json({
                error: false,
                message: 'get data invoice success',
                datas: newInvoice
            })
        }
    } catch (error) {
        next(error)
    }
}

const createInvoice = async (req, res, next) => {
    try {
        const { cartsBeliRumah, addressId } = req.body

        const newInvoice = await InvoiceBeliRumah.create({ noSeri: noResiInvoice(req.user.id), user: req.user.id, cartsBeliRumah, addressId })

        res.status(201).json({
            error: false,
            message: 'create invoice harus di isi',
            datas: newInvoice
        })

    } catch (error) {
        next(error)
    }
}

const updateInvoice = async (req, res, next) => {
    try {
        const { cartsBeliRumah, addressId, status } = req.body

        const valueStatus = ["Pending", "Confirm", "Cancelled"]
        if (!valueStatus.includes(status)) {
            return res.status(400).json({
                error: true,
                message: 'Status tidak valid'
            })
        }

        const newInvoice = await InvoiceBeliRumah.updateOne({ _id: req.params.id }, { cartsBeliRumah, addressId, status })

        if (newInvoice.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update data success',
                datas: newInvoice
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data tidak ada yang di update',
                datas: newInvoice
            })
        }

    } catch (error) {
        next(error)
    }
}

const deleteInvoice = async (req, res, next) => {
    try {
        await InvoiceBeliRumah.deleteOne({ _id: req.params.id })

        res.status(200).json({ error: false, message: 'delete data success' })
    } catch (error) {
        next(error)
    }
}

module.exports = { getInvoice, createInvoice, updateInvoice, deleteInvoice }