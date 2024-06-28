import { Schema } from 'mongoose';
import answerSchema from './answerSchema';

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
