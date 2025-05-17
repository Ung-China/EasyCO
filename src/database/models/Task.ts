import {Model} from '@nozbe/watermelondb';
import {field, text} from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @text('branch_location') branchLocation;
  @text('selected_day') selectedDay;
  @text('selected_currency') selectedCurrency;
  @field('task_details') taskDetails;
}
