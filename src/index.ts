#! /usr/bin/env node

import yargs from 'yargs';
import { getWorkbookRows, writeExampleWorkbook } from 'sheet';
import { writeRows } from 'utils';
import { exampleRows, LocalDataTypes, LocaleDataType, Row } from '_constant';

(async () => {
  const options = await yargs.options({
    path: {
      alias: 'p',
      type: 'string',
    },
    type: {
      alias: 't',
      type: 'string',
      default: 'json',
    },
  }).argv;

  if (options.type) {
    if (!LocalDataTypes.includes(options.type as LocaleDataType)) {
      throw new Error(`Invalid type: ${options.type}`);
    }
  }

  if (options.path) {
    const rows = getWorkbookRows(options.path);
    writeRows(rows as Row[], options.type as LocaleDataType);
    console.log(`Done!`);
  } else {
    writeExampleWorkbook('example.xlsx');
    writeRows(exampleRows, options.type as LocaleDataType);
    console.log(`Example file has been created at ${process.cwd()}`);
  }
})();
