import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubtaskInput {
  @Field(() => String, { description: 'Subtask Name', nullable: true })
  name: string;

  @Field(() => [String], {
    description: 'Subtask Comments',
    defaultValue: [],
    nullable: true,
  })
  comments: string[];
}
