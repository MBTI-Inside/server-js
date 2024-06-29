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
