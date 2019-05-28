const moment = require('moment');

const { Student } = require('../models');

class StudentController {
  async index(req, res) {
    const { currentPage = 0, search = '', showAll = false } = req.query;

    let students = [];
    if (showAll) {
      students = await Student.query()
        .where('name', 'ILIKE', `%${search}%`)
        .orderBy('name');
    } else {
      students = await Student.query()
        .where('name', 'ILIKE', `%${search}%`)
        .orderBy('name')
        .page(currentPage, 10);
    }

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.query()
      .eager('quiz.referral')
      .findById(id);

    student.birthday = student.birthday && moment(student.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY');

    return res.json(student);
  }

  async store(req, res) {
    const { values } = req.body;

    const student = await Student.query().insertGraph(
      { ...values },
      { relate: true, noDelete: true },
    );

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    values.birthday = values.birthday && moment(values.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const student = await Student.query()
      .findById(id)
      .upsertGraph({ ...values }, { relate: true, noInsert: true, noDelete: true });

    return res.json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const student = await Student.query().deleteById(id);

    return res.json(student);
  }
}

module.exports = new StudentController();
