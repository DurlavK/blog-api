const { body,validationResult } = require("express-validator");

var User = require('../models/User');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

exports.all_comments = async (req,res,next) => {
  try {
    const comments = await Comment.find({post: req.params.postid});
    if(!comments) {
      return res.status(404).json({err: "No Comments found"});
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

exports.single_comment = async (req,res,next) => {
  try {
    const comment = await Comment.findById(req.params.commentid);
    if(!comment) {
      return res.status(404).json({err: 'Comment not found'});
    }
    res.status(200).json({comment});
  } catch (error) {
    
  }
}

exports.create_comment = [
  body('body', 'Enter comment body').trim().isLength({min:1}).escape(),
  body('username', 'Enter your name').trim().isLength({min:1}).escape(),
  (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    else {
      var comment = new Comment(
        {
          body: req.body.body,
          username: req.body.username,
          post: req.params.postid
        }
      );
      comment.save(err=>{
        if(err) {return next(err);}
        res.status(200).json({message: "Comment created"})
      });
    }
  }
]

exports.delete_comment= async (req,res,next) => {
  try {
    await Comment.findByIdAndRemove(req.params.commentid, (err)=>{
      if(err) {return next(err);}
      res.status(200).json({message: "Comment deleted"});
    })
  } catch (error) {
    next(error);
  }
}

exports.update_comment = [
  body('body', 'Enter comment body').trim().isLength({min:1}).escape(),
  body('username', 'Enter your name').trim().isLength({min:1}).escape(),
  async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    else {
      var comment = await Comment.findByIdAndUpdate(req.params.commentid, {
        body: req.body.body,
        username: req.body.username,
        post: req.params.postid
        }
      );
      if(!comment) {
        return res.status(404).json({message: "Comment not found"});
      }
      res.status(200).json({message: "comment updated"});
    }
  }
]