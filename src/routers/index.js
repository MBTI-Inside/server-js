import { Router } from 'express';

import memoRouter from './memoRouter.js';

// 버전1 라우터
const v1Router = Router();

v1Router.use('/memos', memoRouter);

export const v1 = v1Router;
