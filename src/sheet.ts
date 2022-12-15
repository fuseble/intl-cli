import XLSX from 'xlsx';
import { exampleRows } from '_constant';

export const createExampleWorkbook = () => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exampleRows);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DONT_TOUCH');

  return workbook;
};

export const writeExampleWorkbook = (fileName: string) => {
  const workbook = createExampleWorkbook();
  XLSX.writeFile(workbook, fileName);
};

export const getWorkbook = (fileName: string) => {
  const workbook = XLSX.readFile(fileName);
  return workbook;
};

export const getWorkbookRows = (fileName: string) => {
  const workbook = getWorkbook(fileName);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(worksheet);

  return rows;
};
