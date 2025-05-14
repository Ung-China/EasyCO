import {Button, Text, View} from 'react-native';
import styles from './style';
import {useState} from 'react';
import {pick} from '@react-native-documents/picker';
import {ImportButton} from '../../components';

const HomeScreen = () => {
  const [fileName, setFileName] = useState('');

  const pickExcelFile = async () => {
    try {
      const [file] = await pick({
        types: [
          'org.openxmlformats.spreadsheetml.sheet',
          'com.microsoft.excel.xls',
        ], // .xlsx and .xls
      });

      if (file) {
        console.log('Picked file:', file);
        setFileName(file.name);
      }
    } catch (err) {
      console.log('Error picking file:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Pick Excel File" onPress={pickExcelFile} />
      {fileName ? <Text>Selected: {fileName}</Text> : null} */}

      <ImportButton />
    </View>
  );
};
export default HomeScreen;
