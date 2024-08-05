const { createEmployeeService, fetchEmployeeByIdService } = require('../Services/employeeService');

// Create Employee controller
const createEmployee = async (req, res) => {
    try {
        const result = await createEmployeeService(req.body);
        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error...", error });
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

module.exports = {
    createEmployee,
    fetchEmployeeById
};
