import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { SubtaskService } from './subtask.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
    ]),
  ],
  providers: [TasksResolver, TasksService, SubtaskService],
})
export class TasksModule {}
