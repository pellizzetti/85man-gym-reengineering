const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Instructor extends Model {
  static get tableName() {
    return 'instructors';
  }

  static get relationMappings() {
    return {
      teaches: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Activity`,
        join: {
          from: 'instructors.id',
          to: 'activities.instructor_id',
        },
      },
    };
  }
}

module.exports = Instructor;
