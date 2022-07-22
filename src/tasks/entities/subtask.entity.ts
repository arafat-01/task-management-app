import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class Subtask {
  @Field(() => String)
  _id: Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String])
  comments?: string[];
}
