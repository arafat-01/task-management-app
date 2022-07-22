import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'Task Name' })
  name: string;

  @Field(() => String, { description: 'Task Status' })
  status: string;
}
