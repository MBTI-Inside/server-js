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
    const { type, targetMbti, description } = req.body;
    return await fitService.addFit({
      type,
      targetMbti,
      description
    });
  })
);

// Fit 수정
fitRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { type, targetMbti, description } = req.body;
    return await fitService.updateFit(id, {
      type,
      targetMbti,
      description
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
