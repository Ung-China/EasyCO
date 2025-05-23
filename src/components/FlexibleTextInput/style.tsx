import {StyleSheet} from 'react-native';
import {Gap, Padding, Radius} from '../../constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: Padding.DEFAULT,
    gap: Gap.EXTRA_SMALL,
  },
  input: {
    padding: Padding.DEFAULT,
    backgroundColor: 'white',
    borderRadius: Radius.DEFAULT,
  },
  label: {
    fontSize: 15,
    color: 'black',
  },
});
