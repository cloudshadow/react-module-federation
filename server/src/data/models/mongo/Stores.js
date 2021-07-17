import mongoose from 'mongoose';

const StoresSchema = mongoose.Schema({
  storeNo: Number,
  storeName: String,
  storeStatus: String,
  openDate: Date,
  closeDate: Date,
  seatCount: Number,
  storeConfigId: String,
  posNum: {
    type: Number,
    default: 2
  },
  ovenNum: {
    type: Number,
    default: 2
  },
  bikeNum: {
    type: Number,
    default: 18
  },
  cutTablePeoples: {
    type: Number,
    default: 2
  },
  insideEfficiency: {
    type: Number,
    default: 1
  },
  middleEfficiency: {
    type: Number,
    default: 1
  },
  outsideEfficiency: {
    type: Number,
    default: 1.3
  },
  updateTime: Date
}, { collection: 'stores' });
StoresSchema.index({ storeNo: 1 });

export default mongoose.model('stores', StoresSchema);