import {Alert, FlatList, View} from 'react-native';
import styles from './style';
import {pick, types} from '@react-native-documents/picker';
import {ImportButton} from '../../components';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import moment from 'moment';

const HomeScreen = () => {
  // const handleImport = async () => {
  //   try {
  //     const response = await pick({
  //       allowMultiSelection: false,
  //       type: [types.xls, types.xlsx],
  //     });

  //     const allFilesAreExcel = response.every(file => file.hasRequestedType);

  //     if (!allFilesAreExcel) {
  //       Alert.alert(
  //         'Invalid file',
  //         'Please select only Excel files (.xls or .xlsx)',
  //       );
  //       return;
  //     }
  //     console.log('SELETED FILE:', response);
  //   } catch (error) {
  //     console.log('ERROR WHILE IMPORTING FILE');
  //   }
  // };

  //  const handleImport = async () => {
  //   try {
  //     const res = await pick({
  //       allowMultiSelection: false,
  //       type: [types.xls, types.xlsx],
  //     });

  //     const file = res[0];
  //     const filePath = file.uri.replace('file://', '');
  //     const fileContent = await RNFS.readFile(filePath, 'base64');
  //     const workbook = XLSX.read(fileContent, { type: 'base64' });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];

  //     const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //     // 1. Extract metadata (row 1)
  //     const metaRow = jsonData[1]; // Row 2 in Excel (index 1)
  //     const branchLocation = metaRow[0];
  //     const rawDate = metaRow[1];
  //     const currency = metaRow[2];

  //     // Convert Excel serial date to readable format
  //     const selectedDay = moment(XLSX.SSF.parse_date_code(rawDate)).format("YYYY-MM-DD");

  //     // 2. Extract header row (row 2)
  //     const headerRow = jsonData[2]; // Row 3 in Excel

  //     // 3. Extract data rows (from row 3 onwards)
  //     const dataRows = jsonData.slice(3);

  //     const data = dataRows.map((row, index) => ({
  //       no: row[0],
  //       accountId: row[1],
  //       name: row[2],
  //       price: row[3],
  //       total: row[4],
  //     }));

  //     const cleanedData = {
  //       branchLocation,
  //       selectedDay,
  //       selectedCurrency: currency,
  //       data,
  //     };

  //     console.log('Cleaned Data:', JSON.stringify(cleanedData, null, 2));
  //   } catch (error) {
  //     console.log('Import error:', error);
  //   }
  // };

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

      // 1. Extract metadata (row 1)
      const metaRow = jsonData[1]; // Row 2 in Excel (index 1)
      const branchLocation = metaRow[0];
      const rawDate = metaRow[1];
      const currency = metaRow[2];

      // Convert Excel serial date to readable format
      const selectedDay = moment(rawDate).format('YYYY-MM-DD');

      // 2. Extract header row (row 2)
      const headerRow = jsonData[2]; // Row 3 in Excel

      // 3. Extract data rows (from row 3 onwards)
      const dataRows = jsonData.slice(3);

      const data = dataRows.map((row, index) => ({
        id: index,
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

      console.log('Cleaned Data:', JSON.stringify(cleanedData, null, 2));
    } catch (error) {
      console.log('Import error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImportButton onPress={handleImport} />
    </View>
  );
};
export default HomeScreen;
