const { Activity } = require('../models');

class ActivityController {
  async index(req, res) {
    const { currentPage = 0, search = '', showAll = false } = req.query;

    let activities = [];
    if (showAll) {
      activities = await Activity.query()
        .eager('instructor')
        .where('description', 'ILIKE', `%${search}%`)
        .orderBy('description');
    } else {
      activities = await Activity.query()
        .eager('instructor')
        .where('description', 'ILIKE', `%${search}%`)
        .orderBy('description')
        .page(currentPage, 10);
    }

    return res.json(activities);
  }

  async show(req, res) {
    const { id } = req.params;

    const activity = await Activity.query()
      .eager('instructor')
      .findById(id);

    return res.json(activity);
  }

  async store(req, res) {
    const { values } = req.body;

    const activity = await Activity.query().insertGraph(
      { ...values },
      { relate: true, noDelete: true },
    );

    return res.json(activity);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    const activity = await Activity.query()
      .findById(id)
      .upsertGraph({ ...values }, { relate: true, noInsert: true, noDelete: true });

    return res.json(activity);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const activity = await Activity.query().deleteById(id);

    return res.json(activity);
  }
}

module.exports = new ActivityController();
