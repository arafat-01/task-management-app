import * as mongoose from 'mongoose';

export const SubtaskSchema = new mongoose.Schema({
  name: String,
  comments: [String],
});

export const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  subtasks: { type: [SubtaskSchema], required: false },
  comments: { type: [String], required: false },
});
