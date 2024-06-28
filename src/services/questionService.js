import { QuestionModel } from '../db/models/index.js';

class QuestionService {
  constructor() {
    this.questionModel = new QuestionModel();
  }
  getQuestion(id) {
    return this.questionModel.findById(id);
  }
  getQuestions() {
    return this.questionModel.findQuestions();
  }
  addQuestion(question) {
    return this.questionModel.create(question);
  }
  updateQuestion(id, question) {
    return this.questionModel.update(id, question);
  }
  deleteQuestion(id) {
    return this.questionModel.delete(id);
  }
}

export default QuestionService;
