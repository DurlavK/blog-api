const { body,validationResult } = require("express-validator");

var User = require('../models/User');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

exports.all_posts = async (req,res,next) => {
  try {
    const posts = await Post.find({});
    if(!posts) {
      return res.status(404).json({err: "No Posts found"});
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

exports.single_post = async (req,res,next) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) {
      return res.status(404).json({err: "Post not found"});
    }
    res.status(200).json({post});
  } catch (error) {
    next(error);
  }
}

exports.create_post = [
  body('title', 'Enter post title').trim().isLength({min:1}).escape(),
  body('body', 'Enter post body').trim().isLength({min:1}).escape(),
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    else {
      var post = new Post(
        {
          title: req.body.title,
          body: req.body.body,
          author: req.body.author
        }
      );
      post.save(err=>{
        if(err) {return next(err);}
        res.status(200).json({message: "Post Created"})
      });
    }
  }
]

exports.delete_post = async (req,res,next) => {
  try {
    await Post.findByIdAndRemove(req.params.id, (err)=>{
      if(err) {return next(err);}
      res.status(200).json({message: "Post deleted"});
    })
  } catch (error) {
    next(err);
  }
}

exports.update_post = [
  body('title', 'Enter post title').trim().isLength({min:1}).escape(),
  body('body', 'Enter post body').trim().isLength({min:1}).escape(),
  async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    else {
      const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
      });
      if(!post) {
        return res.status(404).json({message: "Post not found"});
      }
      res.status(200).json({message: "Post Updated"});
    }
  }
]

exports.publish_post = async (req,res,next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    published: true
  });
  res.status(200).json({message: "Post Published"});
}

exports.unpublish_post = async (req,res,next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    published: false
  });
  res.status(200).json({message: "Post Unpublished"});
}