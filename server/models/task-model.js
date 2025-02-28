const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    comments: { type: [String] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    boardId: { type: Schema.Types.ObjectId, ref: 'KanbanBoard' },
    createdAt: { type: Date, default: Date.now }
});
const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = { TaskModel, TaskSchema };
