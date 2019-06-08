const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Enrollment extends Model {
  static get tableName() {
    return 'enrollments';
  }

  static get relationMappings() {
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Student`,
        join: {
          from: 'enrollments.student_id',
          to: 'students.id',
        },
      },
      activities: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Activity`,
        join: {
          from: 'enrollments.id',
          through: {
            from: 'enrollments_activities.enrollment_id',
            to: 'enrollments_activities.activity_id',
            extra: ['weekdays', 'starts_at', 'ends_at'],
          },
          to: 'activities.id',
        },
      },
    };
  }
}

module.exports = Enrollment;
