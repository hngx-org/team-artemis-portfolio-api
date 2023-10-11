export interface ICustomSection {
  userId: string;
  sectionId: number;
}

export interface ICustomField {
  fieldType: string;
  fieldName: string;
  customSectionId: number;
  customUserSectionId: number;
  value: string;
}

export interface IField {
  fields: Array<ICustomField>;
}

export interface ISection {
  name: string;
  description?: string;
  meta?: string;
}
