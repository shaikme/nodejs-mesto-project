import mongoose from 'mongoose';

interface IUser {
    name: string;
    avatar: string;
    about: string;
}

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
});

export default mongoose.model<IUser>('user', userSchema);
