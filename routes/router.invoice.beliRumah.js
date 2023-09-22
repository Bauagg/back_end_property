const router = require('express').Router()

const controlerInvoice = require('../controler/controler.invoice.beliRumah')
const midelwareAuthorization = require('../midelware/authorization.midelware')
const adminMidelware = require('../midelware/admin.authorization.midelware')

router.get('/invoice-beli-rumah', midelwareAuthorization, controlerInvoice.getInvoice)
router.post('/invoice-beli-rumah', midelwareAuthorization, controlerInvoice.createInvoice)
router.put('/invoice-beli-rumah/:id', midelwareAuthorization, adminMidelware, controlerInvoice.updateInvoice)
router.delete('/invoice-beli-rumah/:id', midelwareAuthorization, adminMidelware, controlerInvoice.deleteInvoice)

module.exports = router