import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './interface/task.interface';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<Task>,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    const newTask = new this.taskModel(createTaskInput);
    return newTask.save();
  }

  findAll() {
    return this.taskModel.find().exec();
  }

  findOne(id: string) {
    return this.taskModel.findOne({ _id: id }).exec();
  }

  update(updateTaskInput: UpdateTaskInput) {
    return this.taskModel
      .findOneAndUpdate({ _id: updateTaskInput.id }, updateTaskInput, {
        upsert: false,
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.taskModel
      .deleteOne({ _id: id })
      .exec()
      .then(() => 'Task successfully removed')
      .catch((err) => err);
  }

  findByStatus(status: string) {
    return this.taskModel.find({ status: status }).exec();
  }

  addCommentToTask(taskId: string, comment: string) {
    return this.taskModel
      .findOneAndUpdate(
        { _id: taskId },
        { $push: { comments: comment } },
        {
          upsert: false,
          new: true,
        },
      )
      .exec();
  }
}
