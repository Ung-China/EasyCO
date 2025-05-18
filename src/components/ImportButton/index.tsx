import {Text} from 'react-native';
import Touchable from '../Touchable';
import styles from './style';
import {ImportButtonProps} from '../../types';

const ImportButton: React.FC<ImportButtonProps> = ({onPress}) => {
  return (
    <Touchable onPress={onPress} containerStyle={styles.contianer}>
      <Text style={styles.icon}>📥</Text>
      <Text style={styles.label}>Select file (.xls or .xlsx)</Text>
    </Touchable>
  );
};
export default ImportButton;
