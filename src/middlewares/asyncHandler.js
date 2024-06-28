// import { buildResponse } from '../misc/utils.js';

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      const response = await requestHandler(req, res);
      return res.json(response); // @MCprotein 데이터 형식 맞추기 위해 buildResponse 유틸 함수 미사용
      // return res.json(buildResponse(response));
    } catch (err) {
      next(err);
    }
  };
};

export default asyncHandler;
