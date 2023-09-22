const Address = require('../model/module.address')

const getAddress = async (req, res, next) => {
    try {
        const newAddress = await Address.find({ user: req.user.id })

        res.status(200).json({
            error: false, message: 'get data address success', datas: newAddress
        })
    } catch (error) {
        next(error)
    }
}

const createAddress = async (req, res, next) => {
    try {
        const { name, kota, provinsi, alamatDetail } = req.body

        const newAddress = await Address.create({ user: req.user.id, name, kota, provinsi, alamatDetail })

        res.status(201).json({
            error: false,
            message: 'create data address success',
            datas: newAddress
        })
    } catch (error) {
        next(error)
    }
}

const updateAddress = async (req, res, next) => {
    try {
        const { name, kota, provinsi, alamatDetail } = req.body
        const newAddress = await Address.updateOne({ _id: req.params.id }, { name, kota, provinsi, alamatDetail })

        if (newAddress.modifiedCount === 1) {
            res.status(201).json({
                error: false,
                message: 'data berhasil di update',
                datas: newAddress
            })
        } else {
            res.status(200).json({
                error: false,
                message: 'data tidak di update',
                datas: newAddress
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getAddress, createAddress, updateAddress }