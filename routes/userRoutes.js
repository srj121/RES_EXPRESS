<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const { allUsers, getByName, deleteById, deletByName, getByAge, addUser } = require('../controller/userController')


router.route('/').get(allUsers)
router.route('/byname').get(getByName)
router.route('/byage').post(getByAge)
router.route('/deleteuserbyid').post(deleteById)
router.route('/deleteuserbyname').post(deletByName)
router.route('/addUser').post(addUser)


=======
const express = require('express')
const router = express.Router()
const { allUsers, getByName, deleteById, deletByName, getByAge, addUser } = require('../controller/userController')


router.route('/').get(allUsers)
router.route('/byname').get(getByName)
router.route('/byage').post(getByAge)
router.route('/deleteuserbyid').post(deleteById)
router.route('/deleteuserbyname').post(deletByName)
router.route('/addUser').post(addUser)


>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
module.exports = router