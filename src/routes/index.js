const express = require('express');
const handle = require('express-async-handler');

const router = express.Router();

const { StudentController, ProductController } = require('../app/controllers');

router.get('/', (req, res) => {
  res.json({ status: 'UP' });
});

router.get('/students', handle(StudentController.index));
router.get('/students/:id', handle(StudentController.show));
router.post('/students', handle(StudentController.store));
router.put('/students/:id', handle(StudentController.update));
router.delete('/students/:id', handle(StudentController.destroy));

router.get('/products', handle(ProductController.index));
router.get('/products/:id', handle(ProductController.show));
router.post('/products', handle(ProductController.store));
router.put('/products/:id', handle(ProductController.update));
router.delete('/products/:id', handle(ProductController.destroy));

module.exports = router;
