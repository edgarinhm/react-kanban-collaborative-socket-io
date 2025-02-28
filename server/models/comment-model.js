const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    text: { type: String, required: true },
    name: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
    createdAt: { type: Date, default: Date.now }
});
const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = { CommentModel, CommentSchema };
