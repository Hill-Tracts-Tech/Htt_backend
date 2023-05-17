const express = require("express");
const router = express.Router();
const {
    createService,
    getServices,
    getService,
    deleteService,
    updateService

} = require("../controllers/service");
const { upload } = require("../utils/fileUpload");


router.post("/createService",upload.single("image"),createService);
router.patch("/updateService/:id", upload.single("image"), updateService);
router.get("/getServices", getServices);
router.get("/getService/:id", getService);
router.delete("/deleteService/:id", deleteService);


module.exports = router;
