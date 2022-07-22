import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubtaskInput } from './dto/subtask.input';
import { Task } from './interface/task.interface';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<Task>,
  ) {}

  addSubtask(id: string, subtaskInput: SubtaskInput) {
    return this.taskModel
      .findByIdAndUpdate(
        id,
        { $push: { subtasks: subtaskInput } },
        {
          upsert: true,
          new: true,
        },
      )
      .exec();
  }

  addCommentToSubtask(subtaskId: string, comment: string) {
    return this.taskModel
      .findOneAndUpdate(
        { 'subtasks._id': subtaskId },
        { $push: { 'subtasks.$[item].comments': comment } },
        { arrayFilters: [{ 'item._id': subtaskId }] },
      )
      .exec();
  }
}
