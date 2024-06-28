import { CommentModel } from '../db/models/index.js';

class CommentService {
  constructor() {
    this.commentModel = new CommentModel();
  }
  getComment(id) {
    return this.commentModel.findById(id);
  }
  getComments() {
    return this.commentModel.findComments();
  }
  addComment(comment) {
    return this.commentModel.create(comment);
  }
  updateComment(id, comment) {
    return this.commentModel.update(id, comment);
  }
  deleteComment(id) {
    return this.commentModel.delete(id);
  }
}

export default CommentService;
