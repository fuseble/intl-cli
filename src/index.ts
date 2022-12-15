#! /usr/bin/env node

import yargs from 'yargs';
import { getWorkbookRows, writeExampleWorkbook } from 'sheet';
import { writeRows } from 'utils';
import { exampleRows, Language, Languages, LocalDataTypes, LocaleDataType, Row } from '_constant';

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
    lang: {
      alias: 'l',
      type: 'string',
      default: 'KO,EN',
    },
  }).argv;

  if (options.type) {
    if (!LocalDataTypes.includes(options.type as LocaleDataType)) {
      throw new Error(`Invalid type: ${options.type}`);
    }
  }

  let languages = [...Languages];
  if (options.lang) {
    languages = options.lang.split(',') as Language[];
    if (!languages.every(lang => Languages.includes(lang))) {
      throw new Error(`Invalid language: ${options.lang}`);
    }
  }

  if (options.path) {
    const rows = getWorkbookRows(options.path);
    writeRows({
      rows: rows as Row[],
      dataType: options.type as LocaleDataType,
      allowedLanguages: languages,
    });
    console.log(`Done!`);
  } else {
    writeExampleWorkbook('example.xlsx');
    writeRows({
      rows: exampleRows,
      dataType: options.type as LocaleDataType,
      allowedLanguages: languages,
    });
    console.log(`Example file has been created at ${process.cwd()}`);
  }
})();
