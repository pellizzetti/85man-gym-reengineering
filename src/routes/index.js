const express = require('express');
const handle = require('express-async-handler');

const router = express.Router();

const { PersonController } = require('../app/controllers');

router.get('/', (req, res) => {
  res.json({ status: 'UP' });
});

router.get('/persons', handle(PersonController.index));

module.exports = router;
