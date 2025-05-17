import {Text, View} from 'react-native';
import styles from './style';
import {TaskHeaderProps} from '../../types';

const TaskHeader: React.FC<TaskHeaderProps> = ({
  branchLocation,
  date,
  currency,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>🏦 Branch Location</Text>
        <Text style={styles.text}>{branchLocation}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>📅 Date </Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>💵 Currency</Text>
        <Text style={styles.text}>{currency}</Text>
      </View>
    </View>
  );
};

export default TaskHeader;
