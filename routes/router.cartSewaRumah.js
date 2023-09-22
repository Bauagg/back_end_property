const router = require('express').Router()

const controlerCartSewaRumah = require('../controler/controler.cartSewaRumah')
const midelwareAuthorization = require('../midelware/authorization.midelware')

router.get('/cart-sewa-rumah', midelwareAuthorization, controlerCartSewaRumah.getCartSewaRumah)
router.post('/cart-sewa-rumah', midelwareAuthorization, controlerCartSewaRumah.createCartSewaRumah)
router.put('/cart-sewa-rumah/:id', midelwareAuthorization, controlerCartSewaRumah.updateCartSewaHome)
router.delete('/cart-sewa-rumah/:id', midelwareAuthorization, controlerCartSewaRumah.deleteCartSewaRumah)

module.exports = router