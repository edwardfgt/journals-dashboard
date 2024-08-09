const path = require('path');
const xlsx = require('xlsx');

const filePath = path.join(__dirname, 'data/pnl.xlsx');
try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    console.log('Raw Sheet Data:', sheet); // Log raw sheet data
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    console.log('Parsed Data:', JSON.stringify(data, null, 2));
} catch (error) {
    console.error('Error reading XLSX file:', error);
}