const db = require('../models');
const Category = db.Category;


 // show category
const getCategory = async (req, res) => {
    try {
      const category = await Category.findAll();
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

   // create category
  const createCategory = (req, res) => {
    const category = {
      name: req.body.name,
      description: req.body.description
    };

    Category.create(category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the category."
        });
      });
  };


   // one category
  const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // change category
const updateCategory = async (req, res) => {
    try {
      const { name} = req.body;
      const [rowsUpdated, [updatedCategory]] = await Category.update(
        { name},
        { returning: true, where: { id: req.params.id } }
      );
      if (rowsUpdated) {
        res.json(updatedCategory);
      } else {
        res.status(404).json({ error: 'category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // delete category
  const deleteCategory = async (req, res) => {
    try {
      const rowsDeleted = await Category.destroy({ where: { id: req.params.id } });
      if (rowsDeleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error});
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    };
    module.exports={getCategory, createCategory, getCategoryById, deleteCategory,updateCategory}