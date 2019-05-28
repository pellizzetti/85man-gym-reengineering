const { Instructor } = require('../models');

class InstructorController {
  async index(req, res) {
    const { currentPage = 0, search = '', showAll = false } = req.query;

    let instructors = [];
    if (showAll) {
      instructors = await Instructor.query()
        .where('name', 'ILIKE', `%${search}%`)
        .orderBy('name');
    } else {
      instructors = await Instructor.query()
        .where('name', 'ILIKE', `%${search}%`)
        .orderBy('name')
        .page(currentPage, 10);
    }

    return res.json(instructors);
  }

  async show(req, res) {
    const { id } = req.params;

    const intructor = await Instructor.query().findById(id);

    return res.json(intructor);
  }

  async store(req, res) {
    const { values } = req.body;

    const instructor = await Instructor.query().insert({
      ...values,
    });

    return res.json(instructor);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    const instructor = await Instructor.query()
      .findById(id)
      .patch({ ...values });

    return res.json(instructor);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const intructor = await Instructor.query().deleteById(id);

    return res.json(intructor);
  }
}

module.exports = new InstructorController();
