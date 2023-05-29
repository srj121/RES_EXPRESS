const express = require('express')
const router = express.Router()
const { reconnect } = require('../controller/Extra')

router.route('/reconnect').get(reconnect)

module.exports = router