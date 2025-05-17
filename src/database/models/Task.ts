import {Model} from '@nozbe/watermelondb';
import {children, text} from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @text('branch_location') branchLocation;
  @text('selected_day') selectedDay;
  @text('selected_currency') selectedCurrency;
  @children('task_details') taskDetails;
}
