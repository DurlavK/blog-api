const mongoose = require('mongoose');
const {DateTime} = require('luxon');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: {type: String, required: true},
    body: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    published: {type: Boolean, default: false},
    author: {type: String, required: true}
  }
);

PostSchema
.virtual('url')
.get(function(){
  return '/api/post/'+this._id;
});

PostSchema
.virtual('timestamp_formatted')
.get(function(){
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Post', PostSchema);