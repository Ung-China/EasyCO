import {TouchableOpacity} from 'react-native';
import {TouchableProps} from '../../types';
import sytles from './sytle';

const Touchable: React.FC<TouchableProps> = ({
  onPress,
  children,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[sytles.container, containerStyle]}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
