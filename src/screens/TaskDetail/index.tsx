import {Alert, ScrollView, Text, View} from 'react-native';
import styles from './style';
import {FlexibleTextInput, LoadingModal, Touchable} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../types';
import {useState} from 'react';
import database from '../../database';

const TaskDetailScreen = () => {
  const route = useRoute<RouteProp<StackParamList, 'TaskDetail'>>();
  const {item} = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    id: item.id,
    no: item.no.toString(),
    accountId: item.accountId,
    name: item.name,
    price: item.price.toString(),
    total: item.total.toString(),
  });

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const allTasks = await database.get('tasks').query().fetch();
      const taskModel = allTasks[0];

      const details = JSON.parse(taskModel.taskDetails);
      const updatedDetails = details.map(d => {
        if (d.id === form.id) {
          return {
            ...d,
            name: form.name,
            price: parseFloat(form.price),
            total: parseFloat(form.total),
          };
        }
        return d;
      });

      await database.write(async () => {
        await taskModel.update(t => {
          t.taskDetails = JSON.stringify(updatedDetails);
        });
      });

      console.log('✅ Task item updated');
      Alert.alert('Success', 'Task updated successfully');
    } catch (error) {
      console.error('❌ Failed to update task item', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <FlexibleTextInput
            label="ID"
            placeholder="ID"
            value={form.id.toString()}
            editable={false}
          />

          <FlexibleTextInput
            label="No"
            placeholder="No"
            value={form.no}
            editable={false}
          />

          <FlexibleTextInput
            label="Account ID"
            placeholder="Account ID"
            value={form.accountId}
            editable={false}
          />

          <FlexibleTextInput
            label="Name"
            placeholder="Name"
            value={form.name}
            onValueChange={text => setForm({...form, name: text})}
          />

          <FlexibleTextInput
            label="Price"
            placeholder="Price"
            value={form.price}
            onValueChange={text => setForm({...form, price: text})}
          />

          <FlexibleTextInput
            label="Total"
            placeholder="Total"
            value={form.total}
            onValueChange={text => setForm({...form, total: text})}
          />
        </View>
      </ScrollView>

      <Touchable containerStyle={styles.button} onPress={handleSave}>
        <Text style={styles.buttonLabel}>Save</Text>
      </Touchable>

      <LoadingModal visible={isLoading} />
    </>
  );
};
export default TaskDetailScreen;
