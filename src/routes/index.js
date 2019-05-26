const express = require('express');
const handle = require('express-async-handler');

const router = express.Router();

const { StudentController } = require('../app/controllers');

router.get('/', (req, res) => {
  res.json({ status: 'UP' });
});

router.get('/students', handle(StudentController.index));

module.exports = router;
