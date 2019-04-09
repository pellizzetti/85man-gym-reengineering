const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Person extends Model {
  static get tableName() {
    return 'persons';
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/PersonQuiz`,
        join: {
          from: 'persons.id',
          to: 'person_quiz.person_id',
        },
      },
      referenced: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/PersonQuiz`,
        join: {
          from: 'persons.id',
          to: 'person_quiz.referral_id',
        },
      },
    };
  }
}

module.exports = Person;
