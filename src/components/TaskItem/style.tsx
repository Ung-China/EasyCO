import {StyleSheet} from 'react-native';
import {Gap, Padding, Radius} from '../../constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: Padding.DEFAULT,
    backgroundColor: 'white',
    padding: Padding.DEFAULT,
    borderRadius: Radius.DEFAULT,
    flexDirection: 'row',
    gap: Gap.DEFAULT,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
  },
  name: {
    color: 'black',
    fontSize: 15,
  },
});
