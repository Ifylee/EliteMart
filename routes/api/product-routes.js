const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [Category, {
        model: Tag,
        through: ProductTag
      }],
    });

  if(!productData) {

    res.status(400).json({ message: "No products found"});
    
    return;
  }

  res.status(200).json(productData);
} catch(err) {
    res.status(500).json(err);
}  
});


router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [Category, {
        model: Tag,
        through: ProductTag
      }], 
    });

  if(!productData) {

    res.status(404).json({ message: "no products found with that id"});
    
    return;
  }

  res.status(200).json(productData);
} catch(err) {
  res.status(500).json(err);
} 
});



// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "product_name": "Basketball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */
    try {
      const newProductData = await Product.create(req.body);
      if(req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArray = req.body.tagIds.map((tag_id) => {
          return {
            product_id: newProductData.id,
            tag_id
          }
        });
        const productTagData = await ProductTag.bulkCreate(productTagIdArray);
        res.status(200).json({tags: productTagData});
      }
      res.status(200).json(productTagData)
  } catch(err) {
      res.status(400).json(err);
  }   
});

router.put('/:id', async (req, res) => {
    try {
      const productData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if(req.body.tagIds && req.body.tagIds.length) {
        const productTags = ProductTag.findAll({ where: { product_id: req.params.id}});

        const productTagIds = productTags.map(({ tag_id}) => tag_id);
        const newProductTags = req.body.tagIds.filter((tag_id) => !productTagIds.include(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id
          }
          
        })
        const productTagsToRemove = (await productTags).filter(({tag_id}) => !req.body.tagIds.includes(tag_id))
        .map(({id}) => id);

        await Product.destroy({ where: { id: productTagsToRemove }})
        await Product.bulkCreate(newProductTags)

        return res.json(productData )

      }

      res.status(200).json(productData );
  } catch(err) {
      res.status(400).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if any product was deleted
    if (!productData) {
      res.status(400).json({ message: 'No product found with that id'}); 
      } else {
        res.status(200).json({message: `Deleted product with id: ${req.params.id}`});
      }
    } catch(err) {
      res.status(400).json(err);
  }      
});

module.exports = router;
