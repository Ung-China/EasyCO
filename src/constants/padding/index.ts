import {Platform} from 'react-native';
import Dimension from '../dimensions';

const Padding = {
  EXTRA_SMALL: 5,
  SMALL: 10,
  DEFAULT: 15,
  LARGE: 20,
  EXTRA_LARGE: 25,
  BOTTOM: Dimension.HEIGHT > 812 && Platform.OS === 'ios' ? 30 : 15,
};

export default Padding;
