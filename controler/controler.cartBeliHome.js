const CartBeliRumah = require('../model/model.cartBeliRumah')
const Product = require('../model/model.product')

const getCartBeliRumah = async (req, res, next) => {
    try {
        const newCartBeliRumah = await CartBeliRumah.find({ user: req.user.id })
            .populate({
                path: 'propertyId',
                populate: {
                    path: 'category'
                }
            }).populate('user', 'name')

        res.status(200).json({
            error: false,
            message: 'get data Cart Beli Rumah success',
            datas: newCartBeliRumah
        })
    } catch (error) {
        next(error)
    }
}

const createCartBeliRumah = async (req, res, next) => {
    try {
        const { propertyId, qty } = req.body

        const property = await Product.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                error: false,
                message: 'data property tidak di temukan'
            })
        }

        const totalPrice = qty * property.price

        const newCartBeliRumah = await CartBeliRumah.create({ propertyId, user: req.user.id, qty, total: totalPrice })
        res.status(201).json({
            error: false,
            message: 'create Cart Beli Rumah succes',
            datas: newCartBeliRumah
        })

    } catch (error) {
        next(error)
    }
}

const updateCartBeliRumah = async (req, res, next) => {
    try {
        const { propertyId, qty } = req.body

        const property = await Product.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                error: true,
                message: 'data not found'
            })
        }

        if (qty < 0) {
            return res.status(400).json({
                error: true,
                message: 'quatity harus minimal 1'
            })
        }

        const totalPrice = qty * property.price

        const newCartBeliRumah = await CartBeliRumah.updateOne({ _id: req.params.id }, { propertyId, user: req.user.id, qty, total: totalPrice })

        if (newCartBeliRumah.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'data berhasil di update',
                datas: newCartBeliRumah
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data tidak ada yang di update',
                datas: newCartBeliRumah
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteCartBeliRumah = async (req, res, next) => {
    try {
        await CartBeliRumah.deleteOne({ _id: req.params.id })
        res.status(200).json({
            error: false,
            message: 'data berhasil di hapus'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getCartBeliRumah, createCartBeliRumah, updateCartBeliRumah, deleteCartBeliRumah }