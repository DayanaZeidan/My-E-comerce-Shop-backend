const express = require("express");
const sequelize = require("./database/database");
const cors = require("cors");
const UsersRoute = require("./routes/Users");
const ProductsRoute = require("./routes/Products");
const CategoriesRoute = require("./routes/Categories");
const CartRoute = require("./routes/Cartitems");
const ProductGalleryRoute = require("./routes/ProductGallery");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.listen(5000, () => {
  console.log("server started on http://localhost:5000");
});

sequelize
  .sync({ alter: false, force: false })
  .then(console.log("successfully sync"))
  .catch((err) => {
    console.log("failed to sync", err);
  });
app.use("/Users", UsersRoute);
app.use("/Products", ProductsRoute);
app.use("/Categories", CategoriesRoute);
app.use("/Cart", CartRoute);
app.use("/ProductGallery", ProductGalleryRoute);
