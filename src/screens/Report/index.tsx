import React from 'react';
import {Alert, Platform, View} from 'react-native';
import styles from './style';
import {ImportButton} from '../../components';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {tasksCollection} from '../../database';
import Share from 'react-native-share';

const ReportScreen = () => {
  const handleExport = async () => {
    try {
      const tasks = await tasksCollection.query().fetch();
      if (!tasks.length) {
        Alert.alert('No Data', 'There is no data to export.');
        return;
      }

      const task = tasks[0];
      const details = JSON.parse(task.taskDetails || '[]');

      // Build original data
      const sheetData = [];
      sheetData.push(['Branch Location', 'Selected Date', 'Currency']);
      sheetData.push([
        task.branchLocation,
        task.selectedDay,
        task.selectedCurrency,
      ]);
      sheetData.push(['No', 'Account ID', 'Name', 'Price', 'Total']);

      details.forEach(row => {
        sheetData.push([row.no, row.accountId, row.name, row.price, row.total]);
      });

      // Add empty first row and first column
      const paddedData = sheetData.map(row => ['', ...row]);
      paddedData.unshift([]); // first row empty

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(paddedData);

      // Style: center alignment
      const centerStyle = {
        alignment: {
          horizontal: 'center',
          vertical: 'center',
        },
      };

      // Apply style to all cells
      Object.keys(ws).forEach(cell => {
        if (cell[0] !== '!') {
          ws[cell].s = centerStyle;
        }
      });

      // Set all columns to width 20
      const maxCols = paddedData[0]?.length || 0;
      ws['!cols'] = Array(maxCols).fill({wch: 20});

      // Write workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Tasks');

      const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

      const exportFileName = `Task_Report_${Date.now()}.xlsx`;
      const filePath =
        Platform.OS === 'android'
          ? `${RNFS.CachesDirectoryPath}/${exportFileName}`
          : `${RNFS.DocumentDirectoryPath}/${exportFileName}`;

      await RNFS.writeFile(filePath, wbout, 'base64');

      await Share.open({
        title: 'Exported Excel File',
        url: `file://${filePath}`,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        showAppsToView: true,
        saveToFiles: true,
      });
    } catch (err) {
      if (err.message.includes('CANCELLED')) return;
      console.error('Export error:', err);
      Alert.alert('Export Failed', 'Something went wrong during export.');
    }
  };

  return (
    <View style={styles.container}>
      <ImportButton
        onPress={handleExport}
        icon={'📤'}
        label="Export file (.xls or .xlsx)"
      />
    </View>
  );
};

export default ReportScreen;
