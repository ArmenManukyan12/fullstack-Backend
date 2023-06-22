const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category')
const jwt_authenticate = require ("../jwt/jwt_authenticate")


    router.get('/allproducts',category_controller.getCategory)
    router.get('/category/:id',category_controller.getCategoryById)
    router.post('/createcategory',jwt_authenticate.authenticateAdminToken,category_controller.createCategory )
    router.delete('/deletecategory/:id', jwt_authenticate.authenticateAdminToken,category_controller.deleteCategory)
    router.put('/updatecategory/:id',jwt_authenticate.authenticateAdminToken,category_controller.updateCategory)

module.exports = router;