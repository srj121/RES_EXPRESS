<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const { addAuthUser, findAuthUser } = require('../controller/authController')



router.route('/authsignup').post(addAuthUser)
router.route('/loginuser').post(findAuthUser)


=======
const express = require('express')
const router = express.Router()
const { addAuthUser, findAuthUser } = require('../controller/authController')



router.route('/authsignup').post(addAuthUser)
router.route('/loginuser').post(findAuthUser)


>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
module.exports = router