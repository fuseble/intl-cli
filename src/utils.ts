import { exampleRows, Languages, type Row, type Language, LocaleDataType } from '_constant';
import fs from 'fs';

export const getJSONRows = (rows: Row[]) => {
  const result: Partial<Record<Language, any>> = {};

  Languages.forEach(lang => {
    rows.forEach(row => {
      if (!result[lang]) result[lang] = {};

      if (row[lang]) {
        result[lang][row.KEY] = row[lang];
      } else if (row['EN']) {
        result[lang][row.KEY] = row['EN'];
      } else {
        result[lang][row.KEY] = '<PLEASE_ADD_DATA>';
      }
    });
  });

  return result;
};

export const writeRows = (rows = exampleRows, dataType: LocaleDataType) => {
  const result = getJSONRows(rows);

  if (!fs.existsSync(`./locale`)) {
    fs.mkdirSync(`./locale`);
  }

  Object.entries(result).forEach(([lang, data]) => {
    if (!fs.existsSync(`./locale`)) {
      fs.mkdirSync(`./locale`);
    }

    if (dataType === 'json') {
      fs.writeFileSync(`./locale/${lang.toLowerCase()}.json`, JSON.stringify(data, null, 2), 'utf-8');
    }

    if (dataType === 'po') {
      const poString = Object.entries(data).reduce(
        (acc, [key, value]) => acc + `msgid "${key}"\nmsgstr "${value}"\n\n`,
        '',
      );

      fs.writeFileSync(`./locale/${lang.toLowerCase()}.po`, poString, 'utf-8');
    }
  });

  if (dataType === 'json') {
    // Total Resources
    const resourceJSON = Object.entries(result).reduce((acc, [lang, data]) => {
      acc[lang.toLowerCase()] = data;
      return acc;
    }, {} as any);

    fs.writeFileSync(`./locale/resources.${dataType}`, JSON.stringify(resourceJSON, null, 2));
  }
};
