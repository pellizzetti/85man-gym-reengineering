const moment = require('moment');

const { Student } = require('../models');

class StudentController {
  async index(req, res) {
    const { currentPage = 0 } = req.query;

    const students = await Student.query()
      .orderBy('name')
      .page(currentPage, 10);

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.query().findById(id);

    student.birthday = student.birthday && moment(student.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY');

    return res.json(student);
  }

  async store(req, res) {
    const { values } = req.body;

    const student = await Student.query().insert({ ...values });

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    values.birthday = values.birthday && moment(values.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const student = await Student.query()
      .findById(id)
      .patch({ ...values });

    return res.json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const student = await Student.query().deleteById(id);

    return res.json(student);
  }
}

module.exports = new StudentController();
