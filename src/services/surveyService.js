import { SurveyModel } from '../db/models/index.js';
import { shuffleArray, isEmptyObj } from '../utils/common.js';

class SurveyService {
  constructor() {
    this.surveyModel = new SurveyModel();
  }
  getSurvey(id) {
    return this.surveyModel.findById(id);
  }
  getSurveys(searchInfo) {
    const search = JSON.parse(searchInfo.search);

    let searchCriteria = {};
    if (!isEmptyObj(search)) {
      const andCriteria = [];
      search.forEach((item) => {
        if (item.field && item.text) {
          // 이미 해당 필드에 대한 조건이 있다면 추가
          if (searchCriteria[item.field]) {
            andCriteria.push({
              [item.field]: { $regex: item.text, $options: 'i' }
            });
          } else {
            searchCriteria[item.field] = { $regex: item.text, $options: 'i' };
          }
        }
      });

      if (andCriteria.length > 0) {
        andCriteria.push(searchCriteria);
        searchCriteria = { $and: andCriteria };
      }
    }

    return this.surveyModel.findSurveys({
      ...searchInfo,
      search: searchCriteria
    });
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
