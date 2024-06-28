import { Router } from 'express';
import { SurveyService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const surveyRouter = Router();
const surveyService = new SurveyService();

// Survey 조회
surveyRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await surveyService.getSurvey(id);
  })
);

// Survey 전체 조회
surveyRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    return await surveyService.getSurveys();
  })
);

// Survey 저장
surveyRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    return await surveyService.addSurvey({
      title,
      content
    });
  })
);

// Survey 수정
surveyRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    return await surveyService.updateSurvey(id, {
      title,
      content
    });
  })
);

// Survey 삭제
surveyRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await surveyService.deleteSurvey(id);
  })
);

export default surveyRouter;
