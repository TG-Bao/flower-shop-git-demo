const express = require("express");
const router = express.Router();

const adminAuthController = require("./admin/authenticatecontroller");
const adminController = require("./admin/admincontroller");
const homeController = require("./homecontroller");
const productController = require("./productcontroller");

// Hierarchy Routing
router.use("/admin", adminAuthController);
router.use("/admin", adminController);
router.use("/", homeController);
router.use("/", productController);

module.exports = router;
