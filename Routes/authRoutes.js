const express = require('express');
const router = express.Router();
const validator=require('../validation/signinValidator')
const authControler=require('../Controlers/authController')

router.post('/signin',validator.signinValidator, authControler.signin);
router.post('/getOtp', authControler.getOtp);
router.post('/verifyOtp', authControler.verifyOtp);

module.exports = router;
