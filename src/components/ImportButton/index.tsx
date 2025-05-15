import {Image, Text, View} from 'react-native';
import Touchable from '../Touchable';
import styles from './style';
import {Icons} from '../../constants';
import {ImportButtonProps} from '../../types';

const ImportButton: React.FC<ImportButtonProps> = ({onPress}) => {
  return (
    <Touchable onPress={onPress} containerStyle={styles.contianer}>
      <Image source={Icons.IMPORT} style={styles.icon} />
      <Text style={styles.label}>Select file (.xls or .xlsx)</Text>
    </Touchable>
  );
};
export default ImportButton;
