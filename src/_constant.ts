export const Languages = ['KO', 'EN', 'JP', 'CN', 'FR', 'DE', 'ES', 'IT', 'PT', 'RU', 'TH', 'VI'] as const;

export type Language = typeof Languages[number];

export type Row = {
  [lang in Language]?: string;
} & {
  KEY: string;
};

export const exampleRows: Row[] = [
  { KEY: 'nickname', KO: '닉네임', EN: 'nickname' },
  { KEY: 'name', KO: '이름', EN: 'name' },
];

export const LocalDataTypes = ['json', 'po'] as const;

export type LocaleDataType = typeof LocalDataTypes[number];
