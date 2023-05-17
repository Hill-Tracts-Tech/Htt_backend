const express = require("express");
const router = express.Router();
const {
    createEmployee,
    getEmplyoees,
    getEmployee,
    deleteEmployee,
    updateEmployee

} = require("../controllers/employee");
const { upload } = require("../utils/employee");


router.post("/createEmployee",upload.single("image"),createEmployee);
router.patch("/updateEmployee/:id", upload.single("image"), updateEmployee);
router.get("/getEmplyoees", getEmplyoees);
router.get("/getEmployee/:id", getEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);


module.exports = router;
