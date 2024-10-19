import { Router } from 'express';
import { MbtiService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const mbtiRouter = Router();
const mbtiService = new MbtiService();

// Mbti 전체 조회
mbtiRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    return await mbtiService.getMbtis();
  })
);

mbtiRouter.get(
  '/:type',
  asyncHandler(async (req, res, next) => {
    const { type } = req.params;
    return await mbtiService.getMbti(type);
  })
);

// Mbti 등록 (초기값 세팅)
mbtiRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { type, summary, content, tags } = req.body;
    return await mbtiService.createMbti({ type, summary, content, tags });
  })
);
// Mbti 수정
mbtiRouter.patch(
  '/:type',
  asyncHandler(async (req, res, next) => {
    const { type } = req.params;
    return await mbtiService.updateMbti(type);
  })
);

export default mbtiRouter;
