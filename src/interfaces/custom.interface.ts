export interface ICustomSection {
  title: string;
  sectionId: number;
  userId: string;
}

export interface ICustomField {
  fieldType: string;
  fieldName: string;
  value: string;
}

export interface IField {
  customSectionId: number;
  customUserSectionId: number;
  fields: Array<ICustomField>;
}

export interface ISection {
  name: string;
  description?: string;
  meta?: string;
  position: number
}

export interface IUpdateSection {
  name?: string;
  description?: string;
  meta?: string;
  position?: number;
}


export interface IGetSection {
  name?: string;
}

export interface IGetSingleSection {
  id: number;
}