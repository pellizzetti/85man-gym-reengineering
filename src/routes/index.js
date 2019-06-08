const express = require('express');
const handle = require('express-async-handler');

const router = express.Router();

const {
  StudentController,
  ProductController,
  InstructorController,
  ActivityController,
  EnrollmentController,
} = require('../app/controllers');

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

router.get('/instructors', handle(InstructorController.index));
router.get('/instructors/:id', handle(InstructorController.show));
router.post('/instructors', handle(InstructorController.store));
router.put('/instructors/:id', handle(InstructorController.update));
router.delete('/instructors/:id', handle(InstructorController.destroy));

router.get('/activities', handle(ActivityController.index));
router.get('/activities/:id', handle(ActivityController.show));
router.post('/activities', handle(ActivityController.store));
router.put('/activities/:id', handle(ActivityController.update));
router.delete('/activities/:id', handle(ActivityController.destroy));

router.get('/enrollments', handle(EnrollmentController.index));
router.get('/enrollments/:id', handle(EnrollmentController.show));
router.post('/enrollments', handle(EnrollmentController.store));
router.put('/enrollments/:id', handle(EnrollmentController.update));
router.delete('/enrollments/:id', handle(EnrollmentController.destroy));

module.exports = router;
