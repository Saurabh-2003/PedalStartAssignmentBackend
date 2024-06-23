// models/Task.ts

import { Document, Schema, model, Model } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

export const Task: Model<ITask> = model<ITask>('Task', TaskSchema);
