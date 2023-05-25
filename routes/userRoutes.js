const express = require('express')
const router = express.Router()
const { allUsers, getByName, deleteById, deletByName, getByAge, addUser } = require('../controller/userController')


router.route('/').get(allUsers)
router.route('/byname').get(getByName)
router.route('/byage').post(getByAge)
router.route('/deleteuserbyid').post(deleteById)
router.route('/deleteuserbyname').post(deletByName)
router.route('/addUser').post(addUser)


module.exports = router