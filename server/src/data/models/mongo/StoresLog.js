import mongoose from 'mongoose';

const StoresLogSchema = mongoose.Schema({
  storeNo: Number,
  posNum: Number,
  ovenNum: Number,
  bikeNum: Number,
  cutTablePeoples: Number,
  insideEfficiency: Number,
  middleEfficiency: Number,
  outsideEfficiency: Number,
  createdTime: Date
}, { collection: 'stores_log' });
StoresLogSchema.index({ storeNo: 1 });

export default mongoose.model('stores_log', StoresLogSchema);