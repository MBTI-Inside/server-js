import { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    // 메모 Id
    memoId: {
      type: Schema.Types.ObjectId,
      ref: 'Memo',
      required: true
    },
    // 댓글 부모 Id
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false
    },
    // 댓글 닉네임
    nickName: {
      type: String,
      required: true
    },
    // 댓글 내용
    content: {
      type: String,
      required: true
    },
    // 댓글 비밀번호
    password: {
      type: String,
      required: true
    },
    // 공감 수
    likeCount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    collection: 'comment',
    timestamps: true,
    versionKey: false
  }
);

export default commentSchema;
