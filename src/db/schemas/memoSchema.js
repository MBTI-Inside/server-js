import { Schema } from 'mongoose';

const memoSchema = new Schema(
  {
    // 메모 제목
    title: {
      type: String,
      required: true
    },
    // 메모 내용
    content: {
      type: String,
      required: true
    },
    // 메모 비밀번호
    password: {
      type: String,
      required: true
    },
    // 메모의 MBTI 타입
    mbtiType: {
      type: String,
      required: true
    },
    // 메모 색상
    cardColor: {
      type: String,
      required: true
    },
    // 공감 수
    likeCount: {
      type: Number,
      default: 0
    },
    // 댓글 수
    cmtCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default memoSchema;
