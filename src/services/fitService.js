import { FitModel } from '../db/models/index.js';

class FitService {
  constructor() {
    this.fitModel = new FitModel();
  }
  getFit(id) {
    return this.fitModel.findById(id);
  }
  getFits() {
    return this.fitModel.findFits();
  }
  addFit(fit) {
    return this.fitModel.create(fit);
  }
  updateFit(id, fit) {
    return this.fitModel.update(id, fit);
  }
  deleteFit(id) {
    return this.fitModel.delete(id);
  }
}

export default FitService;
