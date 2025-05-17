import {Model} from '@nozbe/watermelondb';
import {field, text, relation} from '@nozbe/watermelondb/decorators';

export default class TaskDetail extends Model {
  static table = 'task_details';

  @field('no') number;
  @text('account_id') accountId;
  @text('name') name;
  @field('price') price;
  @field('total') total;
  @field('task_id') taskId;
  @relation('tasks', 'task_id') task;
}
