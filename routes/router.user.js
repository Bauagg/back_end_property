const router = require('express').Router()

const controlerUserr = require('../controler/controler.user')
const authorizationMidelware = require('../midelware/authorization.midelware')

router.post('/register', controlerUserr.register)
router.post('/login', controlerUserr.login)
router.get('/profile', authorizationMidelware, controlerUserr.profile)

module.exports = router