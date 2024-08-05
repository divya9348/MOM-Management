const mongoose = require('mongoose');
const validator = require('validator');

const otpSchema = new mongoose.Schema({
    employeeEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email",
        },
    },
    otp: {
        type: String,
        // required: true,
        expires: '1m' // OTP expires in 5 minutes
    }
}, {
    timestamps: true,
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
