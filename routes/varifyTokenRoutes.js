const express = require('express')
const router = express.Router()
const verifyToken = require('../middleWare/verifyToken')

router.route('/verifyToken').post(verifyToken)

module.exports = router