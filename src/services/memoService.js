import { MemoModel, CommentModel } from '../db/models/index.js';
import { hashPassword, compareHashPassword } from '../misc/utils.js';
import { isEmptyObj } from '../utils/common.js';
import AppError from '../misc/AppError.js';

class MemoService {
  constructor() {
    this.memoModel = new MemoModel();
    this.commentModel = new CommentModel();
  }
  getMemo(id) {
    return this.memoModel.findById(id);
  }
  // TODO: 댓글 수는 해당 메모 Id에 대해 댓글 수를 조회하여 count 값을 가져오는 것이 아니라
  // 댓글을 작성할 때 해당 메모 Id에 대해 댓글 수를 업데이트 하는 방식으로 구현해야 한다.

  getMemos(memoInfo) {
    const search = JSON.parse(memoInfo.search);

    let searchCriteria = {};
    if (!isEmptyObj(search)) {
      const andCriteria = [];
      search.forEach((item) => {
        if (item.field && item.text) {
          // 이미 해당 필드에 대한 조건이 있다면 추가
          if (searchCriteria[item.field]) {
            andCriteria.push({
              [item.field]: { $regex: item.text, $options: 'i' }
            });
          } else {
            searchCriteria[item.field] = { $regex: item.text, $options: 'i' };
          }
        }
      });

      if (andCriteria.length > 0) {
        andCriteria.push(searchCriteria);
        searchCriteria = { $and: andCriteria };
      }
    }

    return this.memoModel.findMemos({ ...memoInfo, search: searchCriteria });
  }
  async addMemo(memo) {
    const hashedPassword = await hashPassword(memo.password);
    return this.memoModel.create({ ...memo, password: hashedPassword });
  }
  async checkMemo(id, password) {
    const memo = await this.memoModel.findById(id, true);
    const isPasswordCorrect = await compareHashPassword(
      password,
      memo.password
    );

    if (!isPasswordCorrect) {
      throw new AppError('Bad Request', 400, '비밀번호를 확인해 주세요.');
    }
    return memo;
  }
  async updateMemo(id, memo) {
    const hashedPassword = await hashPassword(memo.password);
    return this.memoModel.update(id, { ...memo, password: hashedPassword });
  }
  updateMemoLike(id) {
    return this.memoModel.updateLike(id);
  }
  async deleteMemo(id) {
    await this.commentModel.deleteAll(id);
    return this.memoModel.delete(id);
  }
}

export default MemoService;
