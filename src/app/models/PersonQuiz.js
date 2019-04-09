const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class PersonQuiz extends Model {
  static get tableName() {
    return 'person_quiz';
  }

  static get relationMappings() {
    return {
      person: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Person`,
        join: {
          from: 'person_quiz.person_id',
          to: 'person.id',
        },
      },
      referral: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Person`,
        join: {
          from: 'person_quiz.referral_id',
          to: ' persons.id',
        },
      },
    };
  }
}

module.exports = PersonQuiz;
