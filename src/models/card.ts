import mongoose from 'mongoose';

interface ICard {
    name: string;
    link: string;
    ownerId: string;
    likes?: string[];
    createdAt: Date;
}

export const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
