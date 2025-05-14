import {Text, View} from 'react-native';
import Touchable from '../Touchable';
import styles from './style';

const ImportButton: React.FC = () => {
  return (
    <Touchable onPress={() => {}} containerStyle={styles.contianer}>
      <Text>Select</Text>
    </Touchable>
  );
};
export default ImportButton;
