import { MemoModel } from '../db/models/index.js';
import { hashPassword, compareHashPassword } from '../misc/utils.js';

class MemoService {
  constructor() {
    this.memoModel = new MemoModel();
  }
  getMemo(id) {
    return this.memoModel.findById(id);
  }
  getMemos() {
    // TODO: 댓글 수는 해당 메모 Id에 대해 댓글 수를 조회하여 count 값을 가져오는 것이 아니라
    // 댓글을 작성할 때 해당 메모 Id에 대해 댓글 수를 업데이트 하는 방식으로 구현해야 한다.
    return this.memoModel.findMemos();
  }
  addMemo(memo) {
    const hashedPassword = hashPassword(memo.password);
    return this.memoModel.create({ ...memo, password: hashedPassword });
  }
  checkMemo(id, password) {
    const memo = this.memoModel.findById(id);
    const isPasswordCorrect = compareHashPassword(password, memo.password);
    if (!isPasswordCorrect) {
      throw new AppError('Bad Request', 400, '비밀번호를 확인해 주세요.');
    }
    return memo;
  }
  updateMemo(id, memo) {
    const hashedPassword = hashPassword(memo.password);
    return this.memoModel.update(id, { ...memo, password: hashedPassword });
  }
  updateMemoLike(id) {
    return this.memoModel.updateLike(id);
  }
  deleteMemo(id) {
    return this.memoModel.delete(id);
  }
}

export default MemoService;
