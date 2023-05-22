const express = require('express')
const router = express.Router()
const { addAuthUser, findAuthUser } = require('../controller/authController')



router.route('/authsignup').post(addAuthUser)
router.route('/loginuser').post(findAuthUser)


module.exports = router