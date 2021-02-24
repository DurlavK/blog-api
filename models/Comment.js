const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    username: {type: String, required: true},
    body: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    post: {type: Schema.Types.ObjectId, ref: 'Post',required: true}
  }
);

CommentSchema
.virtual('url')
.get(function(){
  return '/api/comment/'+this._id;
});

CommentSchema
.virtual('timestamp_formatted')
.get(function(){
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Comment', CommentSchema);