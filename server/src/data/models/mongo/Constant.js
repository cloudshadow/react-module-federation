import mongoose from 'mongoose';

const ConstantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value: Number,
  desc: String
}, { collection: 'constant' });

export default mongoose.model('constant', ConstantSchema);