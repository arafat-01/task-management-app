import { Field, ObjectType } from '@nestjs/graphql';
import { Subtask } from './subtask.entity';
import { Schema } from 'mongoose';

@ObjectType()
export class Task {
  @Field(() => String)
  _id: Schema.Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;

  @Field(() => [Subtask])
  subtasks?: Subtask[];

  @Field(() => [String])
  comments?: string[];
}
