const express = require('express')
const router = express.Router()
const { OtpGen, sendEmail } = require('../controller/ElasticEmail')



router.route('/elastic/email/send').post(sendEmail)
router.route('/elastic/email/otp').get(OtpGen)


module.exports = router