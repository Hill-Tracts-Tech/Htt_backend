const asyncHandler = require("express-async-handler");
const Employee = require("../models/employee");

// Create Service
const createEmployee = asyncHandler(async (req, res) => {

  //  res.status(200).json({message:"Create service success"})
  const { name, position } = req.body;

  //   Validation
  if (!name || !position) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {    

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    };
  }

  // Create Employee
  const employee = await Employee.create({
    name,
    position,
    image: fileData,
  });

  // console.log(service)

  res.status(201).json(employee);

  });

  // Get all Employees
const getEmplyoees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({}).sort("-createdAt");
  res.status(200).json(employees);
});

// Get single employee
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  // if employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  res.status(200).json(employee);
});

// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  // if employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  await employee.remove();
  res.status(200).json({ message: "Employee deleted." });
});

// Update Employee
const updateEmployee = asyncHandler(async (req, res) => {
  const { name, position } = req.body;
  const { id } = req.params;

  const employee = await Employee.findById(id);

  // if employee doesn't exist
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {    

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    };
  }

  // Update Service
  const updatedEmployee = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      name,
      position,
      image: Object.keys(fileData).length === 0 ? employee?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedEmployee);
});

  
  module.exports = {
    createEmployee,
    getEmplyoees,
    getEmployee,
    deleteEmployee,
    updateEmployee  
  };