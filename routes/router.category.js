const router = require('express').Router()
const controlerCategory = require('../controler/controler.category')
const authorizationMidelware = require('../midelware/authorization.midelware')
const adminAuthorizationMidelware = require('../midelware/admin.authorization.midelware')

router.get('/category', controlerCategory.getCategory)
router.post('/category', authorizationMidelware, adminAuthorizationMidelware, controlerCategory.createCategory)
router.put('/category/:id', authorizationMidelware, adminAuthorizationMidelware, controlerCategory.updateCategory)
router.delete('/category/:id', authorizationMidelware, adminAuthorizationMidelware, controlerCategory.deleteCategory)

module.exports = router