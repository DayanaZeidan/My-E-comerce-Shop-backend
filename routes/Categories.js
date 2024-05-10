const express = require("express");
const router = express.Router();
// const {validateCreateProduct} = require("../validators/Products");
const controller = require("../controllers/Categories");
const {auth, upload} = require("../middleware/middleware")  //we want only auth function

router.get("/get", controller.get);
router.post("/create" ,controller.create);
router.patch("/update", /*auth(["Admin", "Editor"])*/ controller.update);
router.get("/getbyid/:id", controller.getbyid);
router.delete("/delete/:id", controller.delete);

module.exports = router;
