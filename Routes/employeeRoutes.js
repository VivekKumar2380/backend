const express = require("express");
const employeeController = require("../Controllers/employeeController");

const router = express.Router();

router.post("/employees", employeeController.createEmployee);
router.get("/employees", employeeController.getEmployee);
router.get("/employees/Bydepart", employeeController.getEmployeesByDepartment);
router.get("/employees/sal", employeeController.getEmployeesSortedBySalary);
router.get("/employees/search", employeeController.searchEmployeesByFirstName);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);
module.exports = router;
