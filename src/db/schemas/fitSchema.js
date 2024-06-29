import { Schema } from 'mongoose';

const fitSchema = new Schema(
  {
    // 어울림 (특정 MBTI와 어울리는지, 어울리지 않는지에 대한 타입)
    type: {
      type: String,
      required: true,
      enum: ['good', 'bad']
    },
    // 상대 MBTI 유형 (해당 MBTI와 어울리는, 어울리지 않는 MBTI 유형)
    targetMbti: {
      type: String,
      required: true
    },
    // 설명 (해당 MBTI와 상대 MBTI의 궁합에 대한 설명)
    description: {
      type: String,
      required: true
    }
  },
  {
    collection: 'fit',
    timestamps: true,
    versionKey: false
  }
);

export default fitSchema;
