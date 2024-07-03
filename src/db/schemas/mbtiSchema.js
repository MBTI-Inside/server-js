import { Schema } from 'mongoose';
import fitSchema from './fitSchema.js';

const mbtiSchema = new Schema(
  {
    // MBTI 16가지 유형
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
    // MBTI 요약 (해당 MBTI를 한 마디로 표현)
    summary: {
      type: String,
      required: true
    },
    // MBTI 설명 (해당 MBTI에 대한 설명)
    content: {
      type: String,
      required: true
    },
    // 해당 MBTI 주요 키워드
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length === 4;
        },
        message: (props) => `${props.value} should have exactly 4 elements`
      }
    },
    // 해당 MBTI와 어울림
    fit: {
      type: [fitSchema], // fit은 fitSchema 타입의 객체 배열 (good, bad)
      required: true,
      _id: false // 하위 스키마는 id 생성하지 않는다.
    },
    // 해당 MBTI 유형 결과 수치
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
