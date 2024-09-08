import { SurveyModel } from '../db/models/index.js';
import { shuffleArray } from '../utils/common.js';

class SurveyService {
  constructor() {
    this.surveyModel = new SurveyModel();
  }
  getSurvey(id) {
    return this.surveyModel.findById(id);
  }
  getSurveys(searchInfo) {
    return this.surveyModel.findSurveys(searchInfo);
  }
  async getMbtiSurveys() {
    const mbtiSurveys = await this.surveyModel.findMbtiSurveys();

    // 각 문항의 answer 배열을 랜덤하게 섞음
    mbtiSurveys.forEach((survey) => {
      survey.answer = shuffleArray(survey.answer);
    });

    // 전체 배열을 랜덤하게 섞음
    return shuffleArray(mbtiSurveys);
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
