import { Schema } from 'mongoose';

const mbtiSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'ISTJ',
        'ISFJ',
        'INFJ',
        'INTJ',
        'ISTP',
        'ISFP',
        'INFP',
        'INTP',
        'ESTP',
        'ESFP',
        'ENFP',
        'ENTP',
        'ESTJ',
        'ESFJ',
        'ENFJ',
        'ENTJ'
      ],
      unique: true
    },
    count: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    collection: 'mbti',
    versionKey: false
  }
);

export default mbtiSchema;
