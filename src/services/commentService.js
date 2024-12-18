import { CommentModel, MemoModel } from '../db/models/index.js';
import { hashPassword, compareHashPassword } from '../misc/utils.js';

class CommentService {
  constructor() {
    this.commentModel = new CommentModel();
    this.memoModel = new MemoModel();
  }
  getComment(id) {
    return this.commentModel.findById(id);
  }
  getComments(memoId) {
    return this.commentModel.findComments(memoId);
  }
  async addComment(comment) {
    const hashedPassword = await hashPassword(comment.password);
    const response = await this.commentModel.create({
      ...comment,
      password: hashedPassword
    });

    const { memoCmtCount } = await this.memoModel.updateMemoCmt(
      comment.memoId,
      1
    );

    return response;
  }
  async checkComment(id, password) {
    const comment = await this.commentModel.findById(id, true);
    const isPasswordCorrect = await compareHashPassword(
      password,
      comment.password
    );

    if (!isPasswordCorrect) {
      throw new AppError('Bad Request', 400, '비밀번호를 확인해 주세요.');
    }
    return comment;
  }
  async updateComment(id, comment) {
    const hashedPassword = await hashPassword(comment.password);
    return this.commentModel.update(id, {
      ...comment,
      password: hashedPassword
    });
  }
  updateCommentLike(id) {
    return this.commentModel.updateLike(id);
  }
  async deleteComment(id, memoId) {
    const count = await this.commentModel.deleteThread(id, memoId);
    const { memoCmtCount } = await this.memoModel.updateMemoCmt(
      memoId,
      -1 + count.deletedCount * -1
    );
    return this.commentModel.delete(id);
  }
}

export default CommentService;
