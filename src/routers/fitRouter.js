import { Router } from 'express';
import { FitService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const fitRouter = Router();
const fitService = new FitService();

// Fit 조회
fitRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await fitService.getFit(id);
  })
);

// Fit 전체 조회
fitRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    return await fitService.getFits();
  })
);

// Fit 저장
fitRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    return await fitService.addFit({
      title,
      content
    });
  })
);

// Fit 수정
fitRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    return await fitService.updateFit(id, {
      title,
      content
    });
  })
);

// Fit 삭제
fitRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await fitService.deleteFit(id);
  })
);

export default fitRouter;
