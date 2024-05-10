const Products = require("../models/Products");
// const ProductFile = require("../models/ProductFile");
const { validator } = require("../Utils/Command");
const Categories = require("../models/Categories");
const Cartitems = require('../models/Cartitems');

module.exports = {
  get: async (req, res) => {
    const {id} = req.params  //once the user logged in
    const allCartitems = await Cartitems.findAll({
        where: {
            user_id: id,
        }
    });
    if (!allCartitems) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json(allCartitems);
  },
  addtoCart: async (req, res) => {
    const { user_id, product_id} =req.body;
    
    const new_cartitem = await Cartitems.create({
     user_id : user_id,
     product_id: product_id
    });
    if (!new_cartitem) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "cart item added" });
  },

  update: async (req, res) => {
    const { id, name, quantity, description, price, category, image_path } =
      req.body;
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
        category_id: category,
        image_path: image_path,
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
};
