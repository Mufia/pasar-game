import Post from "../models/post.model.js";
import createError from "../utils/createError.js";

export const createPost = async (req, res, next) => {
  if (req.isSeller !== true)
    return next(createError(403, "Only sellers can create a Post!"));
  

  const newPost = new Post({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    if (post.userId.toHexString() !== req.userId)
      return next(createError(403, "You can delete only your post!"));

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("post has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) next(createError(404, "post not found!"));
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};
export const getPosts = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const posts = await Post.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  const posts = await Post.find({})
  .populate ("userId", "--password")
  res.status(200).send(posts);
}


export const soldPost = async (req, res, next) => {
  
  try {
    if (req.isSeller !== true ) {
      return next(createError(403, "Hanya Seller yang bisa update post"));
    }
    const soldPost =  await Post.findByIdAndUpdate(req.params.id,
      { isSold : true }, {new : true}
      )
      res.status(200).send("Sold");
    
  } catch (err) {
    next(err)
    
  }
  
};

export const adminDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!req.isAdmin)
      return next(createError(403, "Only Admin Can Delete Post !"));

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("post has been deleted!");
  } catch (err) {
    next(err);
  }
};