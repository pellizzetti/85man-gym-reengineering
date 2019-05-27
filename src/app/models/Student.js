const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Student extends Model {
  static get tableName() {
    return 'students';
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/StudentQuiz`,
        join: {
          from: 'students.id',
          to: 'student_quiz.student_id',
        },
      },
      referenced: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Student`,
        join: {
          from: 'students.id',
          to: 'student_quiz.referral_id',
        },
      },
    };
  }
}

module.exports = Student;
