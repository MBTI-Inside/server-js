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

// Question Schema
const questionSchema = new Schema(
  {
    subject: {
      type: String,
      required: true
    },
    answer: {
      type: [answerSchema], // answer는 answerSchema 타입의 배열
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 1;
        },
        message: 'Answer array must have two answers'
      }
    },
    mbtiType: {
      type: String,
      required: true,
      enum: ['energy', 'awareness', 'judgement', 'life'] // 허용되는 mbtiType 값
    }
  },
  {
    collection: 'questions',
    timestamps: true,
    versionKey: false
  }
);

export default questionSchema;
