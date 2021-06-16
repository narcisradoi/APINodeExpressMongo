import * as express from 'express';
import { PostModel } from '../models/PostsModel';

export const Posts = express.Router();

Posts.get('/', async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

Posts.get('/specific', (req, res) => {
  res.send('Hello Specific');
});

Posts.post('/', async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.send(error);
  }
});
