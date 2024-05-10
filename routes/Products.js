const express = require("express");
const router = express.Router();
const {validateCreateProduct} = require("../validators/Products");
const controller = require("../controllers/Products");
const {auth, upload} = require("../middleware/middleware")  //we want only auth function

router.get("/get", controller.get);
router.post("/create", [upload.single("picture"), validateCreateProduct] ,controller.create);
router.patch("/update", upload.single("picture"),/*auth(["Admin", "Editor"])*/ controller.update);
router.delete("/delete/:id", controller.delete);

module.exports = router;
