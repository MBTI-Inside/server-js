import { Schema } from 'mongoose';

// Answer Schema
const answerSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['I', 'E', 'S', 'N', 'T', 'F', 'J', 'P'] // MBTI 타입
    },
    content: {
      type: String,
      required: true
    },
    proportion: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  {
    _id: false // 이 서브 스키마에 대해 id 생성 안 함
  }
);

export default answerSchema;
