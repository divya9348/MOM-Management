const express = require('express');
const router = express.Router();
const validator = require('../validation/employeeValidator');
const employeeController = require('../Controlers/employeeControler');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/createdByAdmin',employeeController.createEmpThroughAdmin)
router.post('/create', validator.createEmployeeValidator, employeeController.createEmployee);
router.get('/viewSingleEmployee/:id', verifyToken, employeeController.fetchEmployeeById);
router.post('/listemployee',validator.listEmployeeValidator, verifyToken, employeeController.listEmployee);
router.get('/Adminlistemployee', employeeController.AdminlistEmployee);

module.exports = router;
