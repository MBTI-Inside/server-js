import { Router } from 'express';

import memoRouter from './memoRouter.js';
import commentRouter from './commentRouter.js';
import surveyRouter from './surveyRouter.js';
import fitRouter from './fitRouter.js';

// 버전1 라우터
const v1Router = Router();

v1Router.use('/memos', memoRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/surveys', surveyRouter);
v1Router.use('/fits', fitRouter);

export const v1 = v1Router;
