const express = require('express');
const router = express.Router();
const productRouter = require ("./products")
const userRouter = require ("./users")
router.use(productRouter,userRouter)
module.exports = router;
