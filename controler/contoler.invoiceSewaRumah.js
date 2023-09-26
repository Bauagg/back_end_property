const InvoiceSewaRumah = require('../model/model.invoice.sewaRumah')

const getInvoiceSewaRumah = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const newInvoiceSewaRumah = await InvoiceSewaRumah.find()
                .populate({
                    path: 'sewaRumah',
                    populate: {
                        path: 'productId',
                        populate: {
                            path: 'category'
                        }
                    }
                }).populate('user', 'name')

            const transformedData = newInvoiceSewaRumah.map((invoice) => {
                const sewaRumah = invoice.sewaRumah.map((item) => ({
                    _id: item._id,
                    productId: {
                        name: item.productId.name,
                        kamar_mandi: item.productId.kamar_mandi,
                        kamar_tidur: item.productId.kamar_tidur,
                        luas_rumah: item.productId.luas_rumah,
                        price: item.productId.price,
                        alamat: item.alamat,
                        category: item.productId.category,
                        image: item.productId.image
                    },
                    user: item.user,
                    startDate: item.startDate,
                    endDate: item.endDate
                }))

                return {
                    _id: invoice._id,
                    sewaRumah: sewaRumah,
                    user: {
                        _id: invoice.user._id,
                        name: invoice.user.name,
                    },
                    noTelepon: invoice.noTelepon,
                    noRekening: invoice.noRekening,
                    kartuDebit: invoice.kartuDebit,
                    username: invoice.username,
                    email: invoice.email,
                    status: invoice.status
                }
            })

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
                        path: 'productId',
                        populate: {
                            path: 'category'
                        }
                    }
                }).populate('user', 'name')

            const transformedData = newInvoiceSewaRumah.map((invoice) => {
                const sewaRumahData = invoice.sewaRumah.map((sewa) => ({
                    _id: sewa._id,
                    productId: {
                        _id: sewa.productId._id,
                        name: sewa.productId.name,
                        kamar_tidur: sewa.productId.kamar_tidur,
                        kamar_mandi: sewa.productId.kamar_mandi,
                        luas_rumah: sewa.productId.luas_rumah,
                        price: sewa.productId.price,
                        alamat: sewa.productId.alamat,
                        category: sewa.productId.category.name,
                        image: sewa.productId.image,
                    },
                    user: sewa.user,
                    startDate: sewa.startDate,
                    endDate: sewa.endDate,
                }));

                return {
                    _id: invoice._id,
                    sewaRumah: sewaRumahData,
                    user: {
                        _id: invoice.user._id,
                        name: invoice.user.name,
                    },
                    noTelepon: invoice.noTelepon,
                    kartuDebit: invoice.kartuDebit,
                    username: invoice.username,
                    email: invoice.email,
                    noRekening: invoice.noRekening,
                    status: invoice.status,
                };
            });

            return res.status(200).json({
                error: false,
                message: 'get data invoice sewa rumah success',
                datas: transformedData
            })
        }
    } catch (error) {
        next(error)
    }
}

const createInvoiceSewaRumah = async (req, res, next) => {
    try {
        const { sewaRumah, noTelepon, username, email, kartuDebit, noRekening } = req.body

        const newInvoiceSewaRumah = await InvoiceSewaRumah.create({ sewaRumah, user: req.user.id, noTelepon, username, email, kartuDebit, noRekening })

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
        const { status } = req.body

        const newInvoiceSewaRumah = await InvoiceSewaRumah.updateOne({ _id: req.params.id }, { status })

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