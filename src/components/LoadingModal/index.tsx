import {ActivityIndicator, Modal, View} from 'react-native';
import {LoadingModalProps} from '../../types';
import styles from './style';

const LoadingModal: React.FC<LoadingModalProps> = ({visible}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ActivityIndicator color="black" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
