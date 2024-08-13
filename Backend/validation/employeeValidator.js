const joi = require('joi');
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ;

const createEmployeeValidator = async (req, res, next) => {
    const schema = joi.object({
        employeeName: joi.string().trim().pattern(/^[a-zA-Z]/).required().messages({
            "string.pattern.base": "HTML tags & Special letters are not allowed!",
        }),
        // employeeId:joi.string(),
        employeeEmail: joi.string().email().required(),
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

// const createEmployeebyAdminValidator = async (req, res, next) => {
//     const schema = joi.object({
//         employeeName: joi.string().trim().pattern(/^[a-zA-Z]/).required().messages({
//             "string.pattern.base": "HTML tags & Special letters are not allowed!",
//         }),
//         employeeId:joi.string(),
//         employeeEmail: joi.string().email().required(),
//         phoneno: joi.string().pattern(/^[0-9]{10}$/).required(),
//         password: joi.string().min(6).required().pattern(regularExpression),
//         confirmPassword: joi.string().valid(joi.ref('password')).required(),
//         role:joi.string()
//     });
//     try {
//         await schema.validateAsync(req.body);
//         next();
//     } catch (error) {
//         res.status(400).json({ error: error.details[0].message });
//     }
// };









const listEmployeeValidator = async (req, res, next) => {
    try {
        const headersSchema = joi.object({
            authorization: joi.string().required(),
        }).unknown(true);

        const bodySchema = joi.object({
            searchKey: joi.string()
                .trim()
                .pattern(/^[0-9a-zA-Z ,/-]+$/)
                .message({ "string.pattern.base": "HTML Tags and special characters are not allowed" })
                .optional()
        });

        const querySchema = joi.object({
            limit: joi.number().optional(),
            page: joi.number().optional(),
            order: joi.number().optional(),
        });

        await headersSchema.validateAsync(req.headers);
        await bodySchema.validateAsync(req.body);
        await querySchema.validateAsync(req.query);

        next();
    } catch (error) {
        console.error('Validation Error:', error);
        res.status(400).json({ error: error.details[0].message });
    }
};


module.exports = {
    
    createEmployeeValidator,
    listEmployeeValidator
};



























