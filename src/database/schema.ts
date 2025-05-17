import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tasks',
      columns: [
        {name: 'branch_location', type: 'string'},
        {name: 'selected_day', type: 'string'},
        {name: 'selected_currency', type: 'string'},
        {name: 'task_details', type: 'string'},
      ],
    }),
  ],
});
