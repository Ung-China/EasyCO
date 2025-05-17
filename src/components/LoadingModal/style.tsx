import {StyleSheet} from 'react-native';
import {Radius} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: Radius.DEFAULT,
  },
});
