import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { SubtaskInput } from './dto/subtask.input';
import { SubtaskService } from './subtask.service';
import { Subtask } from './entities/subtask.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly subtasksService: SubtaskService,
  ) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('taskId') taskId: string) {
    return this.tasksService.findOne(taskId);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput);
  }

  @Mutation(() => String)
  removeTask(@Args('taskId') taskId: string) {
    return this.tasksService.remove(taskId);
  }

  @Query(() => [Task], { name: 'taskByStatus' })
  findByStatus(@Args('status') status: string) {
    return this.tasksService.findByStatus(status);
  }

  @Mutation(() => Task, { nullable: true })
  addSubtask(
    @Args('taskId') taskId: string,
    @Args('subtask') subtask: SubtaskInput,
  ) {
    return this.subtasksService.addSubtask(taskId, subtask);
  }

  @Mutation(() => Task, { nullable: true })
  addCommentToTask(
    @Args('taskId') taskId: string,
    @Args('comment') comment: string,
  ) {
    return this.tasksService.addCommentToTask(taskId, comment);
  }

  @Mutation(() => Subtask, { nullable: true })
  addCommentToSubtask(
    @Args('subtaskId') subtaskId: string,
    @Args('comment') comment: string,
  ) {
    return this.subtasksService.addCommentToSubtask(subtaskId, comment);
  }
}
