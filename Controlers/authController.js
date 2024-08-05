const { signinService, getOtpService, verifyOtpService } = require('../Services/authService');

// Signin controller
const signin = async (req, res) => {
    const { employeeID, password } = req.body;
    console.log('req----', req.body);

    try {
        const result = await signinService(employeeID, password);
        console.log("result", result);

        if (result.success) {
            res.status(200).json({ message: 'Login Successful' ,token});
        } else {
            res.status(result.message === 'User not found' ? 404 : 401).json({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching data', error: err.message });
    }
};

// Get OTP controller
const getOtp = async (req, res) => {
    const { employeeEmail } = req.body;
    console.log('email:', req.body);
    console.log('email:', employeeEmail);

    try {
        const result = await getOtpService(employeeEmail);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error('Error in getOtp function:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Verify OTP controller
const verifyOtp = async (req, res) => {
    const { employeeEmail, otp } = req.body;
    console.log('req.body:', req.body);

    try {
        const result = await verifyOtpService(employeeEmail, otp);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error('Error in verifyOtp function:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = {
    signin,
    getOtp,
    verifyOtp
};
