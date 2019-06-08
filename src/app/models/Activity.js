const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Activity extends Model {
  static get tableName() {
    return 'activities';
  }

  static get relationMappings() {
    return {
      instructor: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Instructor`,
        join: {
          from: 'activities.instructor_id',
          to: 'instructors.id',
        },
      },
      enrollments: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Enrollment`,
        join: {
          from: 'activities.id',
          through: {
            from: 'enrollments_activities.activity_id',
            to: 'enrollments_activities.enrollment_id',
          },
          to: 'enrollment.id',
        },
      },
    };
  }
}

module.exports = Activity;
