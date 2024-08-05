const joi = require('joi');
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const signinValidator= async (req, res, next) => {
    const schema = joi.object({
    
        employeeID: joi.string().min(4).max(10).required(),
       
        password: joi.string().min(6).required().pattern(regularExpression),
       
    });
    
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.details[0].message });
    }
};

module.exports = {
    signinValidator};
