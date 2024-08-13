const employeeData = require('../Models/employeeSchema');
const AdminAccess= require('../Models/AdminSchema');

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
        
        return { success: false, message: 'User already exists.' };
    }

    await employeData.save();
    return { success: true, message: "Created Successfully" };
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
       // console.log("query :",query);
    }

    // Pagination and sorting
    const skip = (page - 1) * limit;

    // Fetch total count and employee data
    const totalCount = await AdminAccess.countDocuments(query);
   // console.log('totalCount',totalCount)
    const employees = await AdminAccess.find(query)
        .sort({ _id: order })
        .skip(skip)
        .limit(parseInt(limit));

   // console.log('Query:', query);
   // console.log('Total Count:', totalCount);
   

    return { totalCount, employees };
};


// Function to create an employee
async function createEmployeeService(employeeDetails) {
    const employeData = new employeeData(employeeDetails);

    const employeeExist = await employeeData.findOne({
        $or: [
            { employeeEmail: employeData.employeeEmail },
            { phoneno: employeData.phoneno },
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
    AdminlistEmployeeservice,
    createEmployeeService,
    fetchEmployeeByIdService,
    listEmployeeservice
};
