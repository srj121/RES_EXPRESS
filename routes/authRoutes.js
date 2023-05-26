<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const { addAuthUser, findAuthUser } = require('../controller/authController')



router.route('/authsignup').post(addAuthUser)
router.route('/loginuser').post(findAuthUser)


=======
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


>>>>>>> 5255d0555189735353da1b65e8a7dc4945f78324
>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
module.exports = router