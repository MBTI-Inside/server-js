import { MemoModel } from '../db/models/index.js';

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
    return this.memoModel.create(memo);
  }
  updateMemo(id, memo) {
    return this.memoModel.update(id, memo);
  }
  deleteMemo(id) {
    return this.memoModel.delete(id);
  }
}

export default MemoService;
