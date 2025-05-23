import {FlatList, ScrollView, Text, View} from 'react-native';
import styles from './style';
import {TaskHeader, TaskItem} from '../../components';
import {withObservables} from '@nozbe/watermelondb/react';
import {tasksCollection} from '../../database';
import {StackParamList, TaskItemProps} from '../../types';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

const TaskScreen = ({tasks}) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  if (!tasks || tasks.length === 0) {
    return (
      <View style={styles.noTasksAvailableContainer}>
        <Text style={styles.icon}>📦</Text>
        <Text style={styles.noTasksAvailable}>No tasks available.</Text>
      </View>
    );
  }

  const task = tasks[0]._raw;

  const taskItem = ({item}: TaskItemProps) => {
    return <TaskItem onPress={() => navigateToTaskDetail(item)} item={item} />;
  };

  const navigateToTaskDetail = (item: TaskItemProps) => {
    return navigation.navigate('TaskDetail', {item});
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TaskHeader
        branchLocation={task.branch_location}
        date={task.selected_day}
        currency={task.selected_currency}
      />
      <FlatList
        data={JSON.parse(task.task_details)}
        showsVerticalScrollIndicator={false}
        renderItem={taskItem}
        scrollEnabled={false}
        contentContainerStyle={styles.tasksContainer}
      />
    </ScrollView>
  );
};

const enhance = withObservables([], () => ({
  tasks: tasksCollection.query().observe(),
}));

const EnhancedTaskScreen = enhance(TaskScreen);
export default EnhancedTaskScreen;
