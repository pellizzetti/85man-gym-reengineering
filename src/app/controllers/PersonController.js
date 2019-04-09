const { Person } = require('../models/');

class PersonController {
  async index(req, res) {
    const persons = await Person.query()
      .orderBy('name')
      .page(1, 5);

    return res.json(persons);
  }

  async show(req, res) {
    const person = await Person.query().where('id', req.params.id);

    return res.json(person);
  }

  async store(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new PersonController();
