const router = require('express').Router()

const controlerAddress = require('../controler/controler.address')
const middelwareAuthorization = require('../midelware/authorization.midelware')

router.get('/address', middelwareAuthorization, controlerAddress.getAddress)
router.post('/address', middelwareAuthorization, controlerAddress.createAddress)
router.put('/address/:id', middelwareAuthorization, controlerAddress.updateAddress)

module.exports = router