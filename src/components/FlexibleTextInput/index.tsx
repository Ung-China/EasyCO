import {Text, TextInput, View} from 'react-native';
import {FlexibleTextInputProps} from '../../types';
import styles from './style';

const FlexibleTextInput: React.FC<FlexibleTextInputProps> = ({
  value,
  placeholder,
  onValueChange,
  keyboardType = 'default',
  editable = true,
  multiline = false,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onValueChange}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        style={styles.input}
      />
    </View>
  );
};

export default FlexibleTextInput;
