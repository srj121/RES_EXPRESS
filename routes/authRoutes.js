const express = require('express')
const router = express.Router()
const { addAuthUser, findAuthUser, allEmails, allUserName, allSubscribers, getUserData } = require('../controller/authController')

router.route('/authsignup').post(addAuthUser)
router.route('/loginuser').post(findAuthUser)
router.route('/allEmails').post(allEmails)
router.route('/allUserName').post(allUserName)
router.route('/allSubscribers').get(allSubscribers)
router.route('/getUserData').post(getUserData)

module.exports = router