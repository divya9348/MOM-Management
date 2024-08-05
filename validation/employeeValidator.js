const joi = require('joi');
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const createEmployeeValidator = async (req, res, next) => {
    const schema = joi.object({
        employeeName: joi.string().trim().pattern(/^[a-zA-Z]/).required().messages({
            "string.pattern.base": "HTML tags & Special letters are not allowed!",
        }),
        employeeEmail: joi.string().email().required(),
        employeeID: joi.string().min(4).max(10).required(),
        phoneno: joi.string().pattern(/^[0-9]{10}$/).required(),
        password: joi.string().min(6).required().pattern(regularExpression),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.details[0].message });
    }
};

module.exports = {
    createEmployeeValidator
};




























// const Joi = require('joi');

// // Define the schema for employee data validation
// const employeeSchema = Joi.object({
//     employeeName: Joi.string()
//         .min(3)
//         .max(30)
//         .required()
//         .messages({
//             'string.base': 'Employee name should be a string',
//             'string.empty': 'Employee name is required',
//             'string.min': 'Employee name should have a minimum length of 3 characters',
//             'string.max': 'Employee name should have a maximum length of 30 characters'
//         }),
//     employeeEmail: Joi.string()
//         .email()
//         .required()
//         .messages({
//             'string.base': 'Employee email should be a string',
//             'string.email': 'Employee email must be a valid email address',
//             'string.empty': 'Employee email is required'
//         }),
//     employeeID: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(10)
//         .required()
//         .messages({
//             'string.base': 'Employee ID should be a string',
//             'string.alphanum': 'Employee ID should only contain letters and numbers',
//             'string.min': 'Employee ID should have a minimum length of 3 characters',
//             'string.max': 'Employee ID should have a maximum length of 10 characters',
//             'string.empty': 'Employee ID is required'
//         }),
//     phoneno: Joi.string()
//         .pattern(/^[0-9]{10}$/)
//         .required()
//         .messages({
//             'string.base': 'Phone number should be a string',
//             'string.pattern.base': 'Phone number must be a 10-digit number',
//             'string.empty': 'Phone number is required'
//         }),
//     password: Joi.string()
//         .min(6)
//         .required()
//         .messages({
//             'string.base': 'Password should be a string',
//             'string.min': 'Password should have a minimum length of 6 characters',
//             'string.empty': 'Password is required'
//         }),
//     confirmPassword: Joi.string()
//         .valid(Joi.ref('password'))
//         .required()
//         .messages({
//             'string.base': 'Confirm Password should be a string',
//             'any.only': 'Confirm Password must match the Password',
//             'string.empty': 'Confirm Password is required'
//         })
// });

// const validateEmployee = (data) => {
//     return employeeSchema.validate(data, { abortEarly: false });
// };

// module.exports = { validateEmployee };
