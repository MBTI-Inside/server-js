import { Router } from 'express';
import { MemoService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const memoRouter = Router();
const memoService = new MemoService();

// Memo 조회
memoRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await memoService.getMemo(id);
  })
);

// Memo 전체 조회
memoRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    return await memoService.getMemos();
  })
);

// Memo 저장
memoRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    return await memoService.addMemo({
      title,
      content
    });
  })
);

// Memo 수정
memoRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    return await memoService.updateMemo(id, {
      title,
      content
    });
  })
);

// Memo 삭제
memoRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await memoService.deleteMemo(id);
  })
);

export default memoRouter;
