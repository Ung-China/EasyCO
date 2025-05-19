import {View} from 'react-native';
import styles from './style';
import {ImportButton} from '../../components';

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <ImportButton
        onPress={() => {}}
        icon={'📤'}
        label="Export file (.xls or .xlsx)"
      />
    </View>
  );
};
export default ReportScreen;
