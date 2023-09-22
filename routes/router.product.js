const router = require('express').Router()
const controlerProduct = require('../controler/controler.product')
const authorizationMidelware = require('../midelware/authorization.midelware')
const adminAuthorizationMidelware = require('../midelware/admin.authorization.midelware')

router.get('/product', controlerProduct.getProductPoperty)
router.get('/product/:id', controlerProduct.getProductPopertyById)
router.post('/product', authorizationMidelware, adminAuthorizationMidelware, controlerProduct.createProduct)
router.put('/product/:id', authorizationMidelware, adminAuthorizationMidelware, controlerProduct.updateProduct)
router.delete('/product/:id', authorizationMidelware, adminAuthorizationMidelware, controlerProduct.deleteProduct)

module.exports = router