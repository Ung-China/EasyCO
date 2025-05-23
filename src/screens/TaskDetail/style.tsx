import {StyleSheet} from 'react-native';
import {Dimension, Gap, Margin, Padding, Radius} from '../../constants';

export default StyleSheet.create({
  scrollviewContainer: {
    flex: 1,
    marginVertical: Margin.DEFAULT,
  },
  inputContainer: {
    gap: Gap.DEFAULT,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    marginBottom: Margin.BOTTOM,
    marginHorizontal: Margin.DEFAULT,
    padding: Padding.DEFAULT,
    backgroundColor: 'white',
    width: Dimension.WIDTH - 30,
    borderRadius: Radius.DEFAULT,
  },
  buttonLabel: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});
