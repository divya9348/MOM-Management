const express = require('express');
const router = express.Router();
const validator = require('../validation/employeeValidator');
const employeeController = require('../Controlers/employeeControler');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/create', validator.createEmployeeValidator, employeeController.createEmployee);
router.get('/viewSingleEmployee/:id', verifyToken, employeeController.fetchEmployeeById);

module.exports = router;
