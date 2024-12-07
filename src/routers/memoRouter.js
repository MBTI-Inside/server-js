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
    const { limit, skip, search } = req.query;
    return await memoService.getMemos({
      limit: Number(limit),
      skip: Number(skip),
      search
    });
  })
);

// Memo 저장
memoRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content, nickName, password, mbtiType, cardColor } =
      req.body;
    return await memoService.addMemo({
      title,
      content,
      nickName,
      password,
      mbtiType,
      cardColor
    });
  })
);

// Memo 수정 시 비밀번호 입력 검증
memoRouter.post(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    return await memoService.checkMemo(id, password);
  })
);

// Memo 수정
memoRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content, password, mbtiType, cardColor } = req.body;
    return await memoService.updateMemo(id, {
      title,
      content,
      password,
      mbtiType,
      cardColor
    });
  })
);

// Memo 좋아요 처리
memoRouter.patch(
  '/:id/like',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await memoService.updateMemoLike(id);
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
