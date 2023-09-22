require('./databases/poperti.mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/router.product'))
app.use('/', require('./routes/router.user'))
app.use('/', require('./routes/router.category'))
app.use('/', require('./routes/router.cartSewaRumah'))
app.use('/', require('./routes/router.cartBeliRumah'))
app.use('/', require('./routes/router.address'))
app.use('/', require('./routes/router.invoice.beliRumah'))
app.use('/', require('./routes/router.invoiceSewaRumah'))

app.use(require('./midelware/error.midelware'))

app.listen(4000, () => console.log('connection express success'))