import {Text} from 'react-native';
import Touchable from '../Touchable';
import styles from './style';
import {ImportButtonProps} from '../../types';

const ImportButton: React.FC<ImportButtonProps> = ({onPress, icon, label}) => {
  return (
    <Touchable onPress={onPress} containerStyle={styles.contianer}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </Touchable>
  );
};
export default ImportButton;
