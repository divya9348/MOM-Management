const employeeData = require('../Models/employeeSchema');

// Function to create an employee
async function createEmployeeService(employeeDetails) {
    const employeData = new employeeData(employeeDetails);

    const employeeExist = await employeeData.findOne({
        $or: [
            { employeeEmail: employeData.employeeEmail },
            { employeeID: employeData.employeeID }
        ]
    });

    if (employeeExist) {
        return { success: false, message: 'User already exists.' };
    }

    await employeData.save();
    return { success: true, message: "Created Successfully" };
}

// Function to fetch employee by ID
async function fetchEmployeeByIdService(id) {
    try {
        const employee = await employeeData.findById(id);
        if (!employee) {
            return { success: false, message: 'Employee not found' };
        }
        return { success: true, data: employee };
    } catch (error) {
        return { success: false, message: 'Server Error', error };
    }
}

module.exports = {
    createEmployeeService,
    fetchEmployeeByIdService,
};
