const InvoiceSewaRumah = require('../model/model.invoice.sewaRumah')

const getInvoiceSewaRumah = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const newInvoiceSewaRumah = await InvoiceSewaRumah.find()
                .populate({
                    path: 'sewaRumah',
                    populate: {
                        path: 'productId'
                    }
                }).populate('user', 'name')

            return res.status(200).json({
                error: false,
                message: 'get data invoice sewa rumah success',
                datas: newInvoiceSewaRumah
            })
        } else {
            const newInvoiceSewaRumah = await InvoiceSewaRumah.find({ user: req.user.id })
                .populate({
                    path: 'sewaRumah',
                    populate: {
                        path: 'productId'
                    }
                }).populate('user', 'name')

            return res.status(200).json({
                error: false,
                message: 'get data invoice sewa rumah success',
                datas: newInvoiceSewaRumah
            })
        }
    } catch (error) {
        next(error)
    }
}

const createInvoiceSewaRumah = async (req, res, next) => {
    try {
        const { sewaRumah, noTelepon } = req.body

        const newInvoiceSewaRumah = await InvoiceSewaRumah.create({ sewaRumah, user: req.user.id, noTelepon })

        res.status(201).json({
            error: false,
            message: 'create data invoce sewa rumah success',
            datas: newInvoiceSewaRumah
        })
    } catch (error) {
        next(error)
    }
}

const updateInvoiceSewaRumah = async (req, res, next) => {
    try {
        const { noTelepon } = req.body

        const newInvoiceSewaRumah = await InvoiceSewaRumah.updateOne({ _id: req.params.id }, { noTelepon })

        if (newInvoiceSewaRumah.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update data suuccess',
                datas: newInvoiceSewaRumah
            })
        } else {
            return res.status(201).json({
                error: false,
                message: 'data tidak di update',
                datas: newInvoiceSewaRumah
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteInvoceSewaRumah = async (req, res, next) => {
    try {
        await InvoiceSewaRumah.deleteOne({ _id: req.params.id })

        res.status(200).json({ error: false, message: 'delete data success' })
    } catch (error) {
        next(error)
    }
}

module.exports = { getInvoiceSewaRumah, createInvoiceSewaRumah, updateInvoiceSewaRumah, deleteInvoceSewaRumah }