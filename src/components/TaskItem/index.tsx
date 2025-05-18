import {Text, View} from 'react-native';
import styles from './style';
import {TaskItemProps} from '../../types';
import Touchable from '../Touchable';

const TaskItem: React.FC<TaskItemProps> = ({onPress, item}) => {
  return (
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💼</Text>
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </Touchable>
  );
};

export default TaskItem;
