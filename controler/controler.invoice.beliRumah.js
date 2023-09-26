const InvoiceBeliRumah = require('../model/module.invoice.beliRumah')
const noResiInvoice = require('../utils/invoicenumber')

const getInvoice = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const newInvoice = await InvoiceBeliRumah.find()
                .populate({
                    path: 'cartsBeliRumah',
                    populate: {
                        path: 'propertyId',
                        populate: {
                            path: 'category'
                        }
                    }
                })
                .populate('addressId')
                .populate('user', 'name')


            const responDate = newInvoice.map((resoult) => {
                const cartsBeliRumah = resoult.cartsBeliRumah.map((invoice) => ({
                    _id: invoice._id,
                    propertyId: {
                        _id: invoice.propertyId._id,
                        name: invoice.propertyId.name,
                        kamar_tidur: invoice.propertyId.kamar_tidur,
                        kamar_mandi: invoice.propertyId.kamar_mandi,
                        luas_rumah: invoice.propertyId.luas_rumah,
                        price: invoice.propertyId.price,
                        alamat: invoice.propertyId.alamat,
                        category: invoice.propertyId.category.name,
                        image: invoice.propertyId.image
                    },
                    user: invoice.user,
                    qty: invoice.qty,
                    total: invoice.total
                }))
                return {
                    _id: resoult._id,
                    noSeri: resoult.noSeri,
                    cartsBeliRumah: cartsBeliRumah,
                    addressId: {
                        _id: resoult.addressId._id,
                        name: resoult.addressId.name,
                        kecamatan: resoult.addressId.kecamatan,
                        kota: resoult.addressId.kota,
                        provinsi: resoult.addressId.provinsi
                    },
                    noTelepon: resoult.noTelepon,
                    kartuDebit: resoult.kartuDebit,
                    noRekening: resoult.noRekening,
                    status: resoult.status
                }
            })
            return res.status(200).json({
                error: false,
                message: 'get data invoice success',
                datas: responDate
            })
        } else {
            const newInvoice = await InvoiceBeliRumah.find({ user: req.user.id })
                .populate({
                    path: 'cartsBeliRumah',
                    populate: {
                        path: 'propertyId',
                        populate: {
                            path: 'category'
                        }
                    }
                })
                .populate('addressId')
                .populate('user', 'name')

            const responDate = newInvoice.map((resoult) => {
                const cartsBeliRumah = resoult.cartsBeliRumah.map((invoice) => ({
                    _id: invoice._id,
                    propertyId: {
                        _id: invoice.propertyId._id,
                        name: invoice.propertyId.name,
                        kamar_tidur: invoice.propertyId.kamar_tidur,
                        kamar_mandi: invoice.propertyId.kamar_mandi,
                        luas_rumah: invoice.propertyId.luas_rumah,
                        price: invoice.propertyId.price,
                        alamat: invoice.propertyId.alamat,
                        category: invoice.propertyId.category.name,
                        image: invoice.propertyId.image
                    },
                    user: invoice.user,
                    qty: invoice.qty,
                    total: invoice.total
                }))
                return {
                    _id: resoult._id,
                    noSeri: resoult.noSeri,
                    cartsBeliRumah: cartsBeliRumah,
                    addressId: {
                        _id: resoult.addressId._id,
                        name: resoult.addressId.name,
                        kecamatan: resoult.addressId.kecamatan,
                        kota: resoult.addressId.kota,
                        provinsi: resoult.addressId.provinsi
                    },
                    noTelepon: resoult.noTelepon,
                    kartuDebit: resoult.kartuDebit,
                    noRekening: resoult.noRekening,
                    status: resoult.status
                }
            })

            return res.status(200).json({
                error: false,
                message: 'get data invoice success',
                datas: responDate
            })
        }
    } catch (error) {
        next(error)
    }
}

const createInvoice = async (req, res, next) => {
    try {
        const { cartsBeliRumah, addressId, noTelepon, kartuDebit, noRekening } = req.body

        const newInvoice = await InvoiceBeliRumah.create({
            noSeri: noResiInvoice(req.user.id),
            user: req.user.id,
            cartsBeliRumah,
            addressId,
            noTelepon,
            kartuDebit,
            noRekening
        })

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
        const { status } = req.body

        const valueStatus = ["Pending", "Confirm", "Cancelled"]
        if (!valueStatus.includes(status)) {
            return res.status(400).json({
                error: true,
                message: 'Status tidak valid'
            })
        }

        const newInvoice = await InvoiceBeliRumah.updateOne({ _id: req.params.id }, { status })

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