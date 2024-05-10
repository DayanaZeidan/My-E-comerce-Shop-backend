const express = require("express");
const router = express.Router();
// const {validateCreateProduct} = require("../validators/Products");
const controller = require("../controllers/Cartitems");
const {auth, upload} = require("../middleware/middleware")  //we want only auth function

router.get("/get/:id", controller.get);
router.post("/addtoCart" ,controller.addtoCart);
// router.patch("/update", /*auth(["Admin", "Editor"])*/ controller.update);
// router.delete("/delete/:id", controller.delete);

module.exports = router;
