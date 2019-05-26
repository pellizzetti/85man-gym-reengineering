const express = require('express');
const handle = require('express-async-handler');

const router = express.Router();

const { StudentController } = require('../app/controllers');

router.get('/', (req, res) => {
  res.json({ status: 'UP' });
});

router.get('/students', handle(StudentController.index));
router.get('/students/:id', handle(StudentController.show));
router.post('/students', handle(StudentController.store));
router.put('/students/:id', handle(StudentController.update));
router.delete('/students/:id', handle(StudentController.destroy));

module.exports = router;
