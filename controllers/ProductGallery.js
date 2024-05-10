const ProductGallery = require("../models/ProductGallery");

module.exports = {
  get: async (req, res) => {
    const id = req.query.id;
    if (id) {
      const productGallery = await ProductGallery.findOne({
        where: {
          product_id: id,
        },
      });
      if (!productGallery) {
        return res.status(500).json({ message: "internal server error" });
      }
      return res.status(200).json({ message: "product file found", path: ProductGallery.path});
    } else {
      const allproducts = await ProductGallery.findAll();
      return res.send(allproducts);
    }
  },
};
