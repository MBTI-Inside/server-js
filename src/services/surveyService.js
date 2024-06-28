import { SurveyModel } from '../db/models/index.js';

class SurveyService {
  constructor() {
    this.surveyModel = new SurveyModel();
  }
  getSurvey(id) {
    return this.surveyModel.findById(id);
  }
  getSurveys() {
    return this.surveyModel.findSurveys();
  }
  addSurvey(survey) {
    return this.surveyModel.create(survey);
  }
  updateSurvey(id, survey) {
    return this.surveyModel.update(id, survey);
  }
  deleteSurvey(id) {
    return this.surveyModel.delete(id);
  }
}

export default SurveyService;
