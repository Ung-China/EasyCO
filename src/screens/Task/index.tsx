import {Text, View} from 'react-native';
import styles from './style';
import {TaskHeader} from '../../components';
import {withObservables} from '@nozbe/watermelondb/react';
import database from '../../database';

const TaskScreen = ({tasks}) => {
  return (
    <View style={styles.container}>
      <TaskHeader branchLocation={'hahaha'} date={'haah'} currency={'haah'} />
    </View>
  );
};

const enhance = withObservables([], () => ({
  tasks: database.collections.get('tasks').query().observe(),
}));

const EnhancedTaskScreen = enhance(TaskScreen);
export default EnhancedTaskScreen;
