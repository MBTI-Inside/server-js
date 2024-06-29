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
    let searchArray = [];
    // search는 다음과 같은 형태로 요청되어야 한다.
    // search=[{"field":"title","text":"안녕"},{"field":"content","text":"하세요"}]

    // 값을 파싱하는 영역이 router단이 맞을까?
    if (search) {
      searchArray = JSON.parse(search);
    }
    // 서비스의 getMemos와 모델단의 findMemos랑 동일한 객체 타입으로 만들어서 보낼 수는 없을까?
    // 모델단의 findMemo는 무조건 key value의 객체 형태여야 될 것 같음
    // 그럼 라우터에서 계산해서 보내는 방법밖에 없을 것 같은데..
    return await memoService.getMemos({
      limit: Number(limit),
      skip: Number(skip),
      search: searchArray
    });
  })
);

// Memo 저장
memoRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { title, content, password, mbtiType, cardColor } = req.body;
    return await memoService.addMemo({
      title,
      content,
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
