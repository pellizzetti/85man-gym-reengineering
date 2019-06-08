const moment = require('moment');

const { Enrollment } = require('../models');

class EnrollmentController {
  async index(req, res) {
    const { currentPage = 0, search = '', showAll = false } = req.query;

    let enrollments = [];
    if (showAll) {
      enrollments = await Enrollment.query()
        .eager('student')
        .modifyEager('student', (builder) => {
          builder.where('name', 'ILIKE', `%${search}%`).select('name');
        })
        .orderBy('created_at');
    } else {
      enrollments = await Enrollment.query()
        .eager('student')
        .modifyEager('student', (builder) => {
          builder.where('name', 'ILIKE', `%${search}%`).select('name');
        })
        .orderBy('created_at')
        .page(currentPage, 10);
    }

    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.query()
      .eager('[student, activities]')
      .findById(id);

    enrollment.examination_date = enrollment.examination_date
      && moment(enrollment.examination_date, 'YYYY-MM-DD').format('DD/MM/YYYY');

    return res.json(enrollment);
  }

  async store(req, res) {
    const { values } = req.body;

    values.examination_date = values.examination_date && moment(values.examination_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const enrollment = await Enrollment.query().insertGraph(
      { ...values },
      { relate: true, unrelate: true, noDelete: true },
    );

    return res.json(enrollment);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    values.examination_date = values.examination_date && moment(values.examination_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const enrollment = await Enrollment.query()
      .findById(id)
      .upsertGraph({ ...values }, { relate: true, noInsert: true, noDelete: true });

    return res.json(enrollment);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.query().deleteById(id);

    return res.json(enrollment);
  }
}

module.exports = new EnrollmentController();
