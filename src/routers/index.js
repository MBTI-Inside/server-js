import { Router } from 'express';

import memoRouter from './memoRouter.js';
import commentRouter from './commentRouter.js';
import questionRouter from './questionRouter.js';

// 버전1 라우터
const v1Router = Router();

v1Router.use('/memos', memoRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/questions', questionRouter);

export const v1 = v1Router;
