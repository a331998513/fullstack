import { Request, Response, RequestHandler } from "express";

const POSTS = require("../models/post");

const getPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const Posts = await POSTS.find();
    res.status(200).json(Posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const addPost: RequestHandler = async (req: Request, res: Response) => {
  const {
    id,
    username,
    link,
    title,
    category,
    detail,
    comments,
    vote,
    status,
  } = req.body;
  const newPost = new POSTS({
    id,
    username,
    title,
    vote,
    detail,
    link,
    category,
    status,
    comments,
  });

  console.log(req.body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);

    res.status(404).json({ message: err.message });
  }
};

export = { getPost, addPost };

/**
 * @desc supposedly this section should include the following functions
 */

//editPost
//delPost
//addComment
//addDirectReply
//addInnerReply
