const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')

const adminController = require('../../../controllers/apis/admin-controller')
const categoryController = require('../../../controllers/apis/category-controller')

router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)

router.get('/users', adminController.getUsers)

router.delete('/categories/:id', categoryController.deleteCategory)
router.post('/categories', categoryController.postCategory)
router.put('/categories/:id', categoryController.putCategory)
router.get('/categories', categoryController.getCategories)

module.exports = router
