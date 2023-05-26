<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const { OtpGen, sendEmail } = require('../controller/ElasticEmail')



router.route('/elastic/email/send').post(sendEmail)
router.route('/elastic/email/otp').get(OtpGen)


=======
<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const { OtpGen, sendEmail } = require('../controller/ElasticEmail')



router.route('/elastic/email/send').post(sendEmail)
router.route('/elastic/email/otp').get(OtpGen)


=======
const express = require('express')
const router = express.Router()
const { OtpGen, sendEmail } = require('../controller/ElasticEmail')



router.route('/elastic/email/send').post(sendEmail)
router.route('/elastic/email/otp').get(OtpGen)


>>>>>>> 5255d0555189735353da1b65e8a7dc4945f78324
>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
module.exports = router