const router = require('express').Router()

const controlerInvoiceSewaRumah = require('../controler/contoler.invoiceSewaRumah')
const midelwareAuthorization = require('../midelware/authorization.midelware')
const adminMidelware = require('../midelware/admin.authorization.midelware')

router.get('/invoice-sewa-rumah', midelwareAuthorization, controlerInvoiceSewaRumah.getInvoiceSewaRumah)
router.post('/invoice-sewa-rumah', midelwareAuthorization, controlerInvoiceSewaRumah.createInvoiceSewaRumah)
router.put('/invoice-sewa-rumah/:id', midelwareAuthorization, adminMidelware, controlerInvoiceSewaRumah.updateInvoiceSewaRumah)
router.delete('/invoice-sewa-rumah/:id', midelwareAuthorization, adminMidelware, controlerInvoiceSewaRumah.deleteInvoceSewaRumah)

module.exports = router