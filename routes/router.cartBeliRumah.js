const router = require('express').Router()

const controlerCartBeliRumah = require('../controler/controler.cartBeliHome')
const midelwareAuthorization = require('../midelware/authorization.midelware')

router.get('/cart-beli-rumah', midelwareAuthorization, controlerCartBeliRumah.getCartBeliRumah)
router.post('/cart-beli-rumah', midelwareAuthorization, controlerCartBeliRumah.createCartBeliRumah)
router.put('/cart-beli-rumah/:id', midelwareAuthorization, controlerCartBeliRumah.updateCartBeliRumah)
router.delete('/cart-beli-rumah/:id', midelwareAuthorization, controlerCartBeliRumah.deleteCartBeliRumah)

module.exports = router