const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class StudentQuiz extends Model {
  static get tableName() {
    return 'person_quiz';
  }

  static get relationMappings() {
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Student`,
        join: {
          from: 'student_quiz.student_id',
          to: 'student.id',
        },
      },
      referral: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Student`,
        join: {
          from: 'student_quiz.referral_id',
          to: ' students.id',
        },
      },
    };
  }
}

module.exports = StudentQuiz;
