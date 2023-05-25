<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const { reconnect } = require('../controller/Extra')



router.route('/reconnect').get(reconnect)



=======
const express = require('express')
const router = express.Router()
const { reconnect } = require('../controller/Extra')



router.route('/reconnect').get(reconnect)



>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
module.exports = router