const express = require('express');
const router = express.Router();
const productRouter = require ("./products")
const userRouter = require ("./users")
const categoryRouter = require ("./category")
router.use(productRouter,userRouter,categoryRouter)
module.exports = router;
