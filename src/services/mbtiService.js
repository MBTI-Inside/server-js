import { MbtiModel } from '../db/models/index.js';

class MbtiService {
  constructor() {
    this.mbtiModel = new MbtiModel();
  }
  getMbtis() {
    return this.mbtiModel.findMbtis();
  }
  updateMbti(id, mbti) {
    return this.mbtiModel.update(id, mbti);
  }
}

export default MbtiService;
