import React from 'react';
import {Alert, Platform, View} from 'react-native';
import ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

import {tasksCollection} from '../../database';
import styles from './style';
import {ImportButton} from '../../components';

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

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Tasks');

      const headerInfoRow = worksheet.addRow([
        'Branch Location',
        'Selected Date',
        'Currency',
      ]);
      headerInfoRow.height = 25;
      headerInfoRow.eachCell(cell => {
        cell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FF1F4E78'},
        };
        cell.alignment = {horizontal: 'center', vertical: 'middle'};
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'},
        };
      });

      const headerInfoDataRow = worksheet.addRow([
        task.branchLocation,
        task.selectedDay,
        task.selectedCurrency,
      ]);
      headerInfoDataRow.height = 25;
      headerInfoDataRow.eachCell(cell => {
        cell.alignment = {horizontal: 'center', vertical: 'middle'};
      });

      worksheet.columns = [{width: 20}, {width: 20}, {width: 20}];

      const headerRow = worksheet.addRow([
        'No',
        'Account ID',
        'Name',
        'Price',
        'Total',
      ]);
      headerRow.height = 25;
      headerRow.eachCell(cell => {
        cell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FF1F4E78'},
        };
        cell.alignment = {horizontal: 'center', vertical: 'middle'};
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'},
        };
      });

      worksheet.columns = [
        {key: 'no', width: 30},
        {key: 'accountId', width: 30},
        {key: 'name', width: 30},
        {key: 'price', width: 30},
        {key: 'total', width: 30},
      ];

      details.forEach(row => {
        const dataRow = worksheet.addRow({
          no: row.no,
          accountId: row.accountId,
          name: row.name,
          price: row.price,
          total: row.total,
        });
        dataRow.height = 25;
        dataRow.alignment = {horizontal: 'center', vertical: 'middle'};
      });

      const buffer = await workbook.xlsx.writeBuffer();

      const exportFileName = `Task_Report_${Date.now()}.xlsx`;
      const filePath =
        Platform.OS === 'android'
          ? `${RNFS.CachesDirectoryPath}/${exportFileName}`
          : `${RNFS.DocumentDirectoryPath}/${exportFileName}`;

      await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');

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
        label="Export file (.xlsx)"
      />
    </View>
  );
};

export default ReportScreen;
