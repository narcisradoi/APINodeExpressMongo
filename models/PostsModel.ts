import { Schema, model } from 'mongoose';

interface Post {
  title: string;
  description: string;
  date?: object;
}

const PostSchema = new Schema<Post>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const PostModel = model<Post>('Posts', PostSchema);
