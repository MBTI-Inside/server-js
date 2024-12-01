import { Router } from 'express';
import { CommentService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const commentRouter = Router();
const commentService = new CommentService();

// Comment 조회
commentRouter.get(
  '/id/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await commentService.getComment(id);
  })
);

// Comment 전체 조회
commentRouter.get(
  '/:memoId',
  asyncHandler(async (req, res, next) => {
    const { memoId } = req.params;
    return await commentService.getComments(memoId);
  })
);

// Comment 저장
commentRouter.post(
  '/:memoId',
  asyncHandler(async (req, res, next) => {
    const { memoId } = req.params;
    const { nickName, parentCommentId = null, content, password } = req.body;
    return await commentService.addComment({
      memoId,
      parentCommentId,
      nickName,
      content,
      password
    });
  })
);

// Comment 수정 시 비밀번호 입력 검증
commentRouter.post(
  '/id/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    return await commentService.checkComment(id, password);
  })
);

// Comment 수정
commentRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nickName, parentCommentId, content, password } = req.body;
    return await commentService.updateComment(id, {
      parentCommentId,
      nickName,
      content,
      password
    });
  })
);

// Memo 좋아요 처리
commentRouter.patch(
  '/:id/like',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await commentService.updateCommentLike(id);
  })
);

// Comment 삭제
commentRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await commentService.deleteComment(id);
  })
);

export default commentRouter;
