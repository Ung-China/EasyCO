import {StyleSheet} from 'react-native';
import {Gap, Margin, Padding, Radius} from '../../constants';

export default StyleSheet.create({
  contianer: {
    margin: Margin.DEFAULT,
    padding: Padding.DEFAULT,
    borderRadius: Radius.DEFAULT,
    gap: Gap.DEFAULT,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  label: {
    color: 'black',
    fontSize: 15,
  },
});
