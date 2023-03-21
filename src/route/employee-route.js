// employee routes-------------------------
const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee-controller');

router.post('/register', employeeController.registerEmployee)

module.exports = router;

