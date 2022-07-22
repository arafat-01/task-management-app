import { Field, InputType } from '@nestjs/graphql';
import { Subtask } from '../entities/subtask.entity';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;
}
