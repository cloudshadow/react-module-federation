import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: String,
  password: String,
  role: Number,
  phone: String,
  position: String,
  sex: String,
  updateTime: Date,
  createTime: Date
}, { collection: 'users' });
UsersSchema.index({ email: 1, userName: 1 });

export default mongoose.model('users', UsersSchema)