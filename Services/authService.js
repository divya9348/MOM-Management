const employeeData = require('../Models/employeeSchema');
const otpSchema = require('../Models/otpSchema');
const transporter = require('../emailsetup/mailsetup');
const messages = require('../constants/message');
const authMiddleware = require('../middlewares/authMiddleware');

// Function to generate OTP
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// signing in with password....................................................................................................
// signing in with password....................................................................................................
async function signinService(employeeID, password) {
    
    const user = await employeeData.findOne({ employeeID });
    if (user) {
        if (password === user.password) {
            
            const token = await authMiddleware.generateToken({
                employeeID: user.employeeID, 
                employeeEmail: user.employeeEmail 
            });

            return {
                success: true,
                token,
                userData: {
                    id: user.employeeID, 
                    email: user.employeeEmail 
                }
                
            };
        } else {
            return { success: false, message: 'Password Incorrect!' };
        }
    } else {
        return { success: false, message: 'User not found' };
    }

}

// Function for getting OTP
async function getOtpService(employeeEmail) {
    const userData = await employeeData.findOne({ employeeEmail });
    if (userData) {
        const otp = generateOtp();
        let existingUser = await otpSchema.findOne({ employeeEmail });
        if (existingUser) {
            existingUser.otp = otp;
            await existingUser.save();
        } else {
            const newOtp = new otpSchema({
                employeeEmail,
                otp
            });
            await newOtp.save();
        }

        const mailOptions = {
            from: `"${process.env.FROM_EMAIL_NAME}"<${process.env.EMAIL_USER}>`,
            to: employeeEmail,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
            attachments: []
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject({ success: false, message: 'Error sending email', error });
                } else {
                    resolve({ success: true, message: 'OTP sent successfully.', otp });
                }
            });
        });
    } else {
        return { success: false, message: 'User not found.' };
    }
}

// Function for verifying OTP
async function verifyOtpService(employeeEmail, otp) {
    const userData = await otpSchema.findOne({ employeeEmail });
    if (userData) {
        if (userData.otp === otp) {
            userData.otp = null;
            await userData.save();
            return { success: true, message: 'OTP verified successfully.' };
        } else {
            return { success: false, message: 'Invalid OTP.' };
        }
    } else {
        return { success: false, message: 'OTP not found for this email.' };
    }
}

module.exports = {
    signinService,
    getOtpService,
    verifyOtpService
};
