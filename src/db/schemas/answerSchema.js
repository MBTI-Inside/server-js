import { Schema } from 'mongoose';

// Answer Schema
const answerSchema = new Schema(
  {
    // MBTI 타입 (어떤 MBTI에 대한 답변인지에 대한 타입)
    type: {
      type: String,
      required: true,
      enum: ['I', 'E', 'S', 'N', 'T', 'F', 'J', 'P'] // MBTI 타입
    },
    // 답변 내용
    content: {
      type: String,
      required: true
    },
    // 답변 비율 (해당 MBTI에 얼마 정도의 비중도가 있는지에 대한 수치)
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
