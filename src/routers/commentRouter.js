import { Router } from 'express';
import { CommentService } from '../services/index.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const commentRouter = Router();
const commentService = new CommentService();

// Comment 조회
commentRouter.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    return await commentService.getComment(id);
  })
);

// Comment 전체 조회
commentRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    return await commentService.getComments();
  })
);

// Comment 저장
commentRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    return await commentService.addComment({
      title,
      content
    });
  })
);

// Comment 수정
commentRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    return await commentService.updateComment(id, {
      title,
      content
    });
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
