const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [Product],
      });

    if(!categoryData) {

      res.status(400).json({ message: "No categories found"});
      
      return;
    }

    res.status(200).json(categoryData);
  } catch(err) {
      res.status(500).json(err);
  }   
});


router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product], 
    });

  if(!categoryData) {

    res.status(404).json({ message: "no category found with that id"});
    
    return;
  }

  res.status(200).json(categoryData);
} catch(err) {
  res.status(500).json(err);
} 
  
});

router.post('/', async (req, res) => {
    try {
      const newCategoryData = await Category.create(req.body);
      res.status(200).json(newCategoryData);
  } catch(err) {
      res.status(400).json(err);
  }   
});

router.put('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(categoryData);
  } catch(err) {
      res.status(400).json(err);
  }   
  
});

router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id' });
        return;
      }

      res.status(200).json({message: `Deleted category with id: ${req.params.id}`})
  } catch(err) {
      res.status(400).json(err);
  }   
});

module.exports = router;
