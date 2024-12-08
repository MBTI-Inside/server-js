import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { connectMongoDB } from '../loader/index.js';
import AppError from '../misc/AppError.js';
import commonErrors from '../misc/commonErrors.js';
import { v1 } from '../routers/index.js';

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  optionsSuccessStatus: 200,
  credentials: true
};

// MongoDB에 연결
await connectMongoDB();
console.log('express application을 초기화합니다.');

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Health check API
app.get('/health', (req, res, next) => {
  res.json({
    status: 'OK'
  });
});

// version 1의 api router 등록
app.use('/api/v1', v1);

// 해당되는 URL이 없을 때를 대비한 미들웨어
app.use((req, res, next) => {
  next(
    new AppError(commonErrors.resourceNotFoundError, 404, 'Resource not found')
  );
});

// 에러 핸들러 등록
app.use((error, req, res, next) => {
  console.log(error);
  res.statusCode = error.httpCode ?? 500;
  res.json({
    data: null,
    error: error.message
  });
});

console.log('express application 준비가 완료되었습니다.');

// 조건부 실행: Netlify 환경에서는 무시
if (process.env.NETLIFY !== 'true') {
  app.listen(3000, function () {
    console.log(`어플리케이션 서버가 3000에서 실행 중입니다....`);
  });
}

// Netlify Functions 핸들러
export const handler = serverless(app);
