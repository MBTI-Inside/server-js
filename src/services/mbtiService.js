import { MbtiModel, FitModel } from '../db/models/index.js';

class MbtiService {
  constructor() {
    this.mbtiModel = new MbtiModel();
    this.fitModel = new FitModel();
  }
  getMbtis() {
    return this.mbtiModel.findMbtis();
  }
  async createMbti(mbti) {
    const fits = await this.fitModel.findByType(mbti.type);
    return this.mbtiModel.create({ ...mbti, fit: fits });
  }
  updateMbti(mbti) {
    return this.mbtiModel.update(mbti);
  }
}

export default MbtiService;
