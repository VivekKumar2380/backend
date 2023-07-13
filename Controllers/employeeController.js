const Employee = require("../Models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const Employees = await Employee.find();
    res.json(Employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.query;

    const employees = await Employee.find({ department });

    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEmployeesSortedBySalary = async (req, res) => {
  try {
    const { sortBy } = req.query;

    const employees = await Employee.find().sort({ salary: sortBy });

    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchEmployeesByFirstName = async (req, res) => {
  try {
    const { firstName } = req.query;

    const employees = await Employee.find({
      firstName: { $regex: firstName, $options: "i" },
    });

    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await Employee.findByIdAndDelete(id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, department, salary } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { firstName, lastName, email, department, salary },
      { new: true }
    );

    res.status(200).json({ employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
