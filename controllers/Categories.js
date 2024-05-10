const Categories = require("../models/Categories");
const { validator } = require("../Utils/Command");

module.exports = {
  get: async (req, res) => {
    const all_Categories = await Categories.findAll();
    if (!all_Categories) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json(all_Categories);
  },
  create: async (req, res) => {
    const validationError = validator(req);
    if (validationError) {
      return res.status(500).json({ errors: validationError });
    }
    const { name, parent_category_id } = req.body;
    const new_category = await Categories.create({
      name: name,
      parent_category_id: parent_category_id,
    });
    if (!new_category) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "category created" });
  },
  update: async (req, res) => {
    const { id, name, parent_category_id } = req.body;
    const updated_category = await Categories.update(
      {
        name: name,
        parent_category_id: parent_category_id,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!updated_category) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "category updated" });
  },
  getbyid: async (req, res) => {
    const { id } = req.params;
    const all_Categories = await Categories.findOne({
      where: {
        id: id,
      },
    });
    if (!all_Categories) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json(all_Categories);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted_category = await Categories.destroy({
      where: {
        id: id,
      },
    });
    if (!deleted_category) {
      return res.status(500).json({ error: "internal server error" });
    }
    return res.status(200).json({ message: "category deleted" });
  },
};
