import { Router } from 'express';
import { QuestionService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const questionRouter = Router();
const questionService = new QuestionService();

// Question 조회
questionRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await questionService.getQuestion(id);
  })
);

// Question 전체 조회
questionRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    return await questionService.getQuestions();
  })
);

// Question 저장
questionRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    return await questionService.addQuestion({
      title,
      content
    });
  })
);

// Question 수정
questionRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    return await questionService.updateQuestion(id, {
      title,
      content
    });
  })
);

// Question 삭제
questionRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await questionService.deleteQuestion(id);
  })
);

export default questionRouter;
