const Category = require('../model/model.category')

const getCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.find()

        res.status(200).json({ error: false, message: 'get data Category Success', datas: newCategory })
    } catch (error) {
        next(error)
    }
}

const createCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.create({ name: req.body.name })

        res.status(201).json({ error: false, message: 'create data success', datas: newCategory })
    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.updateOne({ _id: req.params.id }, { name: req.body.name })

        if (newCategory.modifiedCount === 1) {
            res.status(201).json({ error: false, message: 'update data success', datas: newCategory })
        } else {
            res.status(201).json({ error: false, message: 'data tidak di update', datas: newCategory })
        }
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        await Category.deleteOne({ _id: req.params.id })

        res.status(200).json({ error: false, message: 'delete data id {VALUE} success' })
    } catch (error) {
        next(error)
    }
}

module.exports = { getCategory, createCategory, updateCategory, deleteCategory }