const employeeData = require('../Models/employeeSchema');
const AdminAccess= require('../Models/AdminSchema');
const message= require('../constants/message');
const commonhelper= require('../helper/commonHelper');

// Function to create an employee through admin...........
async function createEmployeebyAdminService(employeeDetails) {
    const employeData = new AdminAccess(employeeDetails);

    const employeeExist = await AdminAccess.findOne({
        $or: [
            { employeeEmail: employeData.employeeEmail },
            { phoneno: employeData.phoneno },
        ]
    });

    if (employeeExist) {
        // console.log('success:', message.FAILURE, 'message:', message.USER_ALREADY_EXISTS)
        return { success: message.FAILURE, message:message.USER_ALREADY_EXISTS, status:message.STATUS_SUCCESS }; //FAILURE means false...
    }

    await employeData.save();
    return { success: message.SUCCESS, message: message.CREATED_SUCCESSFULLY, status:message.STATUS_SUCCESS }; //SUCCESS means true....
}

async function checkEmployeeExistenceservice(employeeEmail, employeeID) {
    const employeeExist = await AdminAccess.findOne({
        $or: [
            { employeeEmail: employeeEmail },
            { employeeID: employeeID }
        ]
    });

    return employeeExist !== null; // Returns true if employee exists, false otherwise
}


// Function to see list of employees by admin.........
const AdminlistEmployeeservice = async (bodyData, queryData) => {
    const { order = 1, limit = 0, page = 1 ,searchKey='' } = queryData;
   
    // const { searchKey } = bodyData;
    
    // Create the search query
    let query = { isActive: true };

    if (searchKey) {
        query.$or = [
            { employeeName: { $regex: `^${searchKey}`, $options: "i" } },
            { employeeEmail: { $regex: `^${searchKey}`, $options: "i" } }
        ];
    }

    // Pagination and sorting
    const skip = (page - 1) * limit;

    // Fetch total count and employee data
    const totalCount = await AdminAccess.countDocuments(query);

    const employees = await AdminAccess.find(query)
        .sort({ _id: order })
        .skip(skip)
        .limit(parseInt(limit));

    return { totalCount, employees };
};


// Function to create an employee (signup)..............
async function createEmployeeService(employeeDetails) {
   
    const hashedPassword=await commonhelper.hashedPassword(employeeDetails.password)
    const employeData = new employeeData({...employeeDetails,password:hashedPassword, confirmPassword:hashedPassword});

    const employeeExist = await employeeData.findOne({
        $or: [
            { employeeEmail: employeData.employeeEmail },
            { phoneno: employeData.phoneno },
        ]
    });

    if (employeeExist) {
       
        return { success: message.FAILURE, message: message.USER_ALREADY_EXISTS };
    }
    await employeData.save();
    return { success:  message.SUCCESS, message: message.CREATED_SUCCESSFULLY };
}

// Function to fetch employee by ID
async function fetchEmployeeByIdService(id) {
    try {
        const employee = await employeeData.findById(id);
        if (!employee) {
            return { success: false, message: message.EMPLOYEES_NOT_FOUND };
        }
        return { success: message.SUCCESS, data: employee };
    } catch (error) {
        return { success: message.FAILURE, message: message.SERVER_ERROR, error };
    }
}

// Function to see list of employees.........
const listEmployeeservice = async (bodyData, queryData) => {
    const { order = 1, limit = 0, page = 1 } = queryData;
    const { searchKey } = bodyData;

    // Create the search query
    let query = { isActive: true };

    if (searchKey) {
        query.$or = [
            { employeeName: { $regex: `^${searchKey}`, $options: "i" } },
            { employeeEmail: { $regex: `^${searchKey}`, $options: "i" } }
        ];
        console.log("query :",query);
    }

    // Pagination and sorting
    const skip = (page - 1) * limit;

    // Fetch total count and employee data
    const totalCount = await employeeData.countDocuments(query);
    console.log('totalCount',totalCount)
    const employees = await employeeData.find(query)
        .sort({ _id: order })
        .skip(skip)
        .limit(parseInt(limit));

    console.log('Query:', query);
    console.log('Total Count:', totalCount);
   

    return { totalCount, employees };
};


module.exports = {
    createEmployeebyAdminService,
    checkEmployeeExistenceservice,
    AdminlistEmployeeservice,
    createEmployeeService,
    fetchEmployeeByIdService,
    listEmployeeservice
};
