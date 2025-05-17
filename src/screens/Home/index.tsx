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
    // setIsLoading(true);

    try {
      const response = await pick({
        allowMultiSelection: false,
        type: [types.xls, types.xlsx],
      });

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
        const task = await database.get('tasks').create(taskRecord => {
          taskRecord.branchLocation = branchLocation;
          taskRecord.selectedDay = selectedDay;
          taskRecord.selectedCurrency = currency;
        });

        const taskDetailCollection = database.get('task_details');
        for (const item of data) {
          await taskDetailCollection.create(detail => {
            detail.number = item.no;
            detail.accountId = item.accountId;
            detail.name = item.name;
            detail.price = item.price;
            detail.total = item.total;
            detail.taskId = task.id;
          });
        }
      });

      const savedTasks = await database.get('tasks').query().fetch();
      console.log('Saved Tasks:', savedTasks);

      for (const savedTask of savedTasks) {
        const details = await savedTask.taskDetails.fetch();
        console.log(`Task ${savedTask.id} details:`, details);
      }

      // console.log('DATA', data);
    } catch (error) {
      console.error('ERROR WHILE IMPORT FILE:', error);
    } finally {
      // setIsLoading(false);
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
