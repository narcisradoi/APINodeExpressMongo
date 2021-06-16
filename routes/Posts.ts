import * as express from "express";
import { PostModel } from "../models/PostsModel";

export const Posts = express.Router();

//return all posts
Posts.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

//return specific post
Posts.get("/:id", async (req, res) => {
  try {
    const onePost = await PostModel.findById(req.params.id);
    res.json(onePost);
  } catch (error) {
    res.send(error);
  }
});

//add a post
Posts.post("/", async (req, res) => {
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

//delete a post
Posts.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await PostModel.deleteOne({ _id: req.params.id });
    res.json(deletedPost);
  } catch (error) {
    res.send(error);
  }
});

//update a post
Posts.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await PostModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedPost);
  } catch (error) {
    res.send(error);
  }
});
