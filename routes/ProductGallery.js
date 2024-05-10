const express = require("express");
const router = express.Router();
// const {validateCreateProduct} = require("../validators/Products");
const controller = require("../controllers/ProductGallery");
const {auth} = require("../middleware/middleware")  //we want only auth function

// router.get("/get/?id&name&price", controller.get);
router.get("/get/?id", controller.get);
router.get("/get", controller.get);

module.exports = router;
