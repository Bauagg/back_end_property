const Category = require('../model/model.category')
const Product = require('../model/model.product')

const getProductPoperty = async (req, res, next) => {
    try {
        const newProduct = await Product.find().populate('category', 'name')

        res.status(200).json({
            error: false,
            message: 'get data product success',
            datas: newProduct
        })
    } catch (error) {
        next(error)
    }
}

const getProductPopertyById = async (req, res, next) => {
    try {
        const newProduct = await Product.findOne({ _id: req.params.id }).populate('category', 'name')

        if (!newProduct) {
            return res.status(404).json({
                error: true,
                message: 'data not found',
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'get data product by id success',
                datas: newProduct
            })
        }
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { name, kamar_tidur, kamar_mandi, luas_rumah, price, alamat, category, image } = req.body

        let categoryId = null
        if (category) {
            const newCategory = await Category.findOne({ name: { $regex: category, $options: 'i' } })

            if (newCategory) categoryId = newCategory._id
        }

        const newProduct = await Product.create({ name, kamar_tidur, kamar_mandi, luas_rumah, price, alamat, category: categoryId, image })

        res.status(201).json({
            error: false,
            message: 'create data product poperty success',
            datas: newProduct
        })
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { name, kamar_tidur, kamar_mandi, luas_rumah, price, alamat, category, image } = req.body

        let categoryId = null
        if (category) {
            const newCategory = await Category.findOne({ name: { $regex: category, $options: 'i' } })

            if (newCategory) categoryId = newCategory._id
        }

        const newProduct = await Product.updateOne({ _id: req.params.id }, {
            name,
            kamar_tidur,
            kamar_mandi,
            luas_rumah,
            price,
            alamat,
            category: categoryId,
            image
        })

        if (newProduct.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update data product poperti success',
                datas: newProduct
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data tidak ada yang di update',
                datas: newProduct
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteOne({ _id: req.params.id })

        res.status(200).json({
            error: false,
            message: 'delete data product poperty success'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getProductPoperty, getProductPopertyById, createProduct, updateProduct, deleteProduct }