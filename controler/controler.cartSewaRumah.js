const CartSewaRumah = require('../model/model.sewa.rumah')
const { validator } = require('../utils/validateDate')

const getCartSewaRumah = async (req, res, next) => {
    try {
        const newCartSewaRumah = await CartSewaRumah.find({ user: req.user.id })
            .populate({
                path: 'productId',
                populate: {
                    path: 'category'
                }
            })
            .populate({
                path: 'user',
                select: 'name'
            })

        res.status(200).json({
            error: false,
            message: 'get data success',
            datas: newCartSewaRumah
        })
    } catch (error) {
        next(error)
    }
}

const createCartSewaRumah = async (req, res, next) => {
    try {
        const { productId, startDate, endDate } = req.body

        if (!validator(startDate) || !validator(endDate)) {
            return res.status(400).json({
                error: true,
                message: 'format Date tidak valid'
            })
        }

        const newCartSewaRumah = await CartSewaRumah.create({
            productId,
            user: req.user.id,
            startDate,
            endDate
        })

        res.status(201).json({
            error: false,
            message: 'create Cart Sewa Rumah success',
            datas: newCartSewaRumah
        })
    } catch (error) {
        next(error)
    }
}

const updateCartSewaHome = async (req, res, next) => {
    try {
        const { productId, startDate, endDate } = req.body

        if (!validator(startDate) || !validator(endDate)) {
            return res.status(400).json({
                error: true,
                message: 'format Date tidak valid'
            })
        }

        const newCartSewaRumah = await CartSewaRumah.updateOne({ _id: req.params.id }, { productId, startDate, endDate })

        if (newCartSewaRumah.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'data berhasil di update',
                datas: newCartSewaRumah
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data tidak di update',
                datas: newCartSewaRumah
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteCartSewaRumah = async (req, res, next) => {
    try {
        await CartSewaRumah.deleteOne({ _id: req.params.id })

        res.status(200).json({
            error: false,
            message: 'delete date success'
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { getCartSewaRumah, createCartSewaRumah, updateCartSewaHome, deleteCartSewaRumah }