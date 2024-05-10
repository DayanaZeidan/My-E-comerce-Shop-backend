const Products = require("../models/Products");
// const ProductFile = require("../models/ProductFile");
const { validator } = require("../Utils/Command");
const Categories = require("../models/Categories");
const ProductGallery = require("../models/ProductGallery");

module.exports = {
  get: async (req, res) => {
    const allproducts = await Products.findAll();
    if (!allproducts) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json(allproducts);
  },
  create: async (req, res) => {
    const validationError = validator(req);
    if (validationError) {
      return res.status(500).json({ errors: validationError });
    }
    const { name, description, quantity, price, category } = req.body;
    const { originalname, path } = req.file;
    const cat = await Categories.findOne({
      where: {
        name: category,
      },
    });
    if (!cat) {
      const new_cat = await Categories.create({
        name: category,
        parent_category_id: null,
      });
      if (!new_cat) {
        return res.status(500).json({ error: "internal server error" });
      }
      const new_product = await Products.create({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        category: new_cat.id,
        image_path: path,
      });
      if (!new_product) {
        return res.status(500).json({ error: "internal server error" });
      }
      return res.status(200).json({ message: "product created" });
    }
    const new_product = await Products.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      category: cat.id,
      image_path: path,
    });
    if (!new_product) {
      return res.status(500).json({ error: "internal server error" });
    }
    // const file = await ProductGallery.create({
    //   product_id: new_product.id,
    //   name: originalname,
    //   path: path,
    // });
    // if (!file) {
    //   return res.status(500).json({ error: "internal server error" });
    // }

    return res.status(200).json({ message: "product created" });
  },
  update: async (req, res) => {
    const { id, name, quantity, description, price, category } =
      req.body;
      const { originalname, path } = req.file;
    const cat = await Categories.findOne({
      where: {
        name: category,
      },
    });
    if (!cat) {
      const new_cat = await Categories.create({
        name: category,
        parent_category_id: null,
      });
      if (!new_cat) {
        return res.status(500).json({ error: "internal server error" });
      }
    }

    const updated_product = await Products.update(
      {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        category: category,
        image_path: path,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!updated_product) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "product updated" });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted_product = await Products.destroy({
      where: {
        id: id,
      },
    });
    if (!deleted_product) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "product deleted" });
  },
  getbyid: async (req, res) => {
    const { id } = req.params;
    const allproducts = await Products.findOne({
      where: {
        id: id,
      },
    });
    if (!allproducts) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json(allproducts);
  },
};
