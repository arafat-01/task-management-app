import { Document } from 'mongoose';

export interface Subtask extends Document {
  name?: string;
  comments?: string[];
}
