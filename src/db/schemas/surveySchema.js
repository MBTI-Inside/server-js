import { Schema } from 'mongoose';
import answerSchema from './answerSchema.js';

// Survey Schema
const surveySchema = new Schema(
  {
    // 문항 제목
    subject: {
      type: String,
      required: true
    },
    // 문항 답변
    answer: {
      type: [answerSchema], // answer는 answerSchema 타입의 배열
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2;
        },
        message: 'Answer array must have two answers'
      }
    },
    // 문항 타입 (어떤 유형에 해당되는 타입인지)
    mbtiType: {
      type: String,
      required: true,
      enum: ['energy', 'awareness', 'judgement', 'life'] // 허용되는 mbtiType 값
    }
  },
  {
    collection: 'survey',
    timestamps: true,
    versionKey: false
  }
);

export default surveySchema;
