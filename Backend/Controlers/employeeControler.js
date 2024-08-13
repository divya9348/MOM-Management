const { createEmployeebyAdminService,AdminlistEmployeeservice, createEmployeeService, fetchEmployeeByIdService, listEmployeeservice } = require('../Services/employeeService');

// Create Employee controller by Admin
const createEmpThroughAdmin = async (req, res) => {
    try {
        const result = await createEmployeebyAdminService(req.body);

        if (result) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error...", error });
    }
}

const AdminlistEmployee= async(req, res)=>{
    try{
        const result= await AdminlistEmployeeservice(req.body, req.query);
         console.log("result",result);
         console.log("req.body",req.body)
         console.log("req.query",req.query)

        if(result.totalCount==0){
            return res.status(200).json({ message: "No records found.", result: { employees: [], totalCount: 0 } });

        }
        return res.status(200).json({message:"record found", result});
    }
    catch(error){
        return res.status(404).json({ error: "Server Error...", error});
    }
}

// Create Employee controller
const createEmployee = async (req, res) => {
    try {
        const result = await createEmployeeService(req.body);

        if (result) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error...", error });
    }
}

// Fetch Employee by ID controller
const fetchEmployeeById = async (req, res) => {
    try {
        const result = await fetchEmployeeByIdService(req.params.id);

        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error...", error });
    }
}

const listEmployee= async(req, res)=>{
    try{
        const result= await listEmployeeservice(req.body, req.query);
         console.log("result",result);
         console.log("req.body",req.body)
         console.log("req.query",req.query)

        if(result.totalCount==0){
            return res.status(200).json({message:"records not found."})
        }
        return res.status(200).json({message:"record found", result});
    }
    catch(error){
        return res.status(404).json({ error: "Server Error...", error});
    }
}

module.exports = {
    createEmpThroughAdmin,
    AdminlistEmployee,
    createEmployee,
    fetchEmployeeById,
    listEmployee
};
