import {StyleSheet} from 'react-native';
import {Gap, Margin, Padding} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksContainer: {
    gap: Gap.DEFAULT,
    marginHorizontal: Margin.DEFAULT,
    marginBottom: Margin.DEFAULT,
  },
  noTasksAvailableContainer: {
    padding: Padding.DEFAULT,
    gap: Gap.DEFAULT,
  },
  noTasksAvailable: {
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    textAlign: 'center',
    fontSize: 60,
  },
});
