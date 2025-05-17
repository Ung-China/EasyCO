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
      ],
    }),
    tableSchema({
      name: 'task_details',
      columns: [
        {name: 'no', type: 'number'},
        {name: 'account_id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'price', type: 'number'},
        {name: 'total', type: 'number'},
        {name: 'task_id', type: 'string', isIndexed: true},
      ],
    }),
  ],
});
