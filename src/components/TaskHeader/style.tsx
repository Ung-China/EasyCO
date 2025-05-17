import {StyleSheet} from 'react-native';
import {Gap, Margin, Padding, Radius} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: Margin.DEFAULT,
    padding: Padding.DEFAULT,
    borderRadius: Radius.DEFAULT,
    gap: Gap.DEFAULT,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
});
