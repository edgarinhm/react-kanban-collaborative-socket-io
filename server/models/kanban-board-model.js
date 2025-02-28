const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KanbanBoardSchema = new Schema({
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
const KanbanBoardModel = mongoose.model('KanbanBoard', KanbanBoardSchema);
module.exports = { KanbanBoardModel };
