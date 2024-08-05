
// const { createEmployee, fetchEmployee, fetchEmployeebyId, signin, getOtp, verifyOtp } = require('../Services/functionality');
// const { createEmployeeValidator } = require('../validation/employeeValidator');

// router.post('/create', createEmployeeValidator, createEmployee); // Add the validator middleware here
// router.get('/fetch', fetchEmployee);
// router.get('/fetch/:id', fetchEmployeebyId);
// router.post('/signin', signin);
// router.post('/getOtp', getOtp); // Add this route for OTP
// router.post('/verifyOtp', verifyOtp); // Add this route for verifying OTP




const express = require('express');
const router = express.Router();
const authRouter= require('./authRoutes');
const employeeRouter=require('./employeeRoutes');

router.use('/auth',authRouter);
router.use('/employee',employeeRouter);

module.exports = router;