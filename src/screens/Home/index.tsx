import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import styles from './style';
import {pick, types} from '@react-native-documents/picker';
import {ImportButton, LoadingModal} from '../../components';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import moment from 'moment';
import database from '../../database/index';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    try {
      const response = await pick({
        allowMultiSelection: false,
        type: [types.xls, types.xlsx],
      });

      setIsLoading(true);

      const file = response[0];
      const filePath = file.uri.replace('file://', '');
      const fileContent = await RNFS.readFile(filePath, 'base64');
      const workbook = XLSX.read(fileContent, {type: 'base64'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1});

      const metaRow = jsonData[1];
      const branchLocation = metaRow[0];
      const selectedDay = moment(metaRow[1]).format('YYYY-MM-DD');
      const currency = metaRow[2];

      const dataRows = jsonData.slice(3);
      const data = dataRows.map((row, index) => ({
        id: index + 1,
        no: row[0],
        accountId: row[1],
        name: row[2],
        price: row[3],
        total: row[4],
      }));

      await database.write(async () => {
        const allTasks = await database.get('tasks').query().fetch();
        for (const task of allTasks) {
          await task.markAsDeleted();
        }

        await database.get('tasks').create(task => {
          task.branchLocation = branchLocation;
          task.selectedDay = selectedDay;
          task.selectedCurrency = currency;
          task.taskDetails = JSON.stringify(data);
        });
      });
    } catch (error) {
      console.error('ERROR WHILE IMPORT FILE:', error);
      Alert.alert(
        'Import Failed',
        'There was an error importing the task data. Please try again.',
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        Alert.alert('Success', 'Task data has been imported.');
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default HomeScreen;
