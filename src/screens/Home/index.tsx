import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import styles from './style';
import {pick, types} from '@react-native-documents/picker';
import {ImportButton} from '../../components';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import moment from 'moment';
import database from '../../database/index';
import Task from '../../database/models/Task';

const HomeScreen = async () => {
  const handleImport = async () => {
    try {
      const res = await pick({
        allowMultiSelection: false,
        type: [types.xls, types.xlsx],
      });

      const file = res[0];
      const filePath = file.uri.replace('file://', '');
      const fileContent = await RNFS.readFile(filePath, 'base64');
      const workbook = XLSX.read(fileContent, {type: 'base64'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1});

      console.log('CHECK JSON DATA', jsonData);

      const metaRow = jsonData[1];
      const branchLocation = metaRow[0];
      const rawDate = metaRow[1];
      const currency = metaRow[2];

      const selectedDay = moment(rawDate).format('YYYY-MM-DD');
      const dataRows = jsonData.slice(3);

      const data = dataRows.map(row => ({
        no: row[0],
        accountId: row[1],
        name: row[2],
        price: row[3],
        total: row[4],
      }));

      const cleanedData = {
        branchLocation,
        selectedDay,
        selectedCurrency: currency,
        data,
      };

      // Save to WatermelonDB
      await database.write(async () => {
        const newTask = await database.get('tasks').create(task => {
          task.branchLocation = cleanedData.branchLocation;
          task.selectedDay = cleanedData.selectedDay;
          task.selectedCurrency = cleanedData.selectedCurrency;
        });

        for (const item of cleanedData.data) {
          await database.get('task_details').create(detail => {
            detail.no = item.no;
            detail.accountId = item.accountId;
            detail.name = item.name;
            detail.price = item.price;
            detail.total = item.total;
            detail.task.set(newTask);
          });
        }
      });

      Alert.alert('✅ Success', 'Excel data imported and saved to DB!');
    } catch (error) {
      console.error('❌ Import error:', error);
      Alert.alert('❌ Error', 'Failed to import Excel data.');
    }
  };

  const logAllTasks = async () => {
    try {
      const taskCollection = database.get<Task>('tasks');
      const allTasks = await taskCollection.query().fetch();

      for (const task of allTasks) {
        console.log('Task:', {
          id: task.id,
          branchLocation: task.branchLocation,
          selectedDay: task.selectedDay,
          selectedCurrency: task.selectedCurrency,
        });

        const details = await task.taskDetails.fetch();
        console.log(
          'Task Details:',
          details.map(detail => ({
            id: detail.id,
            no: detail.no,
            name: detail.name,
            price: detail.price,
            total: detail.total,
          })),
        );
      }
    } catch (error) {
      console.error('❌ Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    logAllTasks();
  }, []);

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
    </View>
  );
};

export default HomeScreen;
