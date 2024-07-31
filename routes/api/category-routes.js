const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [Product] 
      });

    if(!categoryData) {

      res.status(400).json({ message: "no categories"})
      return
    }
    res.status(200).json(categoryData)
  } catch(err) {
      res.status(500).json(err);
  }   
});


router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product] 
    });

  if(!categoryData) {

    res.status(400).json({ message: "no category with that id"})
    return
  }
  res.status(200).json(categoryData)
} catch(err) {
    res.status(500).json(err);
} 
  
});

router.post('/', async (req, res) => {
    try {
      const newCategoryData = await Category.create(req.body);
      res.status(200).json(newCategoryData)
  } catch(err) {
      res.status(400).json(err);
  }   
});

router.put('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(categoryData)
  } catch(err) {
      res.status(400).json(err);
  }   
  
});

router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({categoryData, status: `deleted category with id: ${id}`})
  } catch(err) {
      res.status(400).json(err);
  }   
});

module.exports = router;
