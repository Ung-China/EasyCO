import {TextInput} from 'react-native';

const FlexibleTextInput: React.FC = () => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onValueChange}
      keyboardType={keyboardType}
      editable={editable}
      multiline={multiline}
    />
  );
};

export default FlexibleTextInput;
