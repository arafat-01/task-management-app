import { Document } from 'mongoose';
import { Subtask } from './subtask.interface';

export interface Task extends Document {
  name: string;
  status: string;
  subtasks?: Subtask[];
  comments?: string[];
}
