
const express = require('express');
const router = express.Router();
const authRouter= require('./authRoutes');
const employeeRouter=require('./employeeRoutes');

router.use('/auth',authRouter);
router.use('/employee',employeeRouter);

module.exports = router;