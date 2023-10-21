export interface ICustomSection {
  // userId: string;
  title: string;
  sectionId: number;
}

export interface ICustomField {
  fieldType: string;
  fieldName: string;
  // customSectionId: number;
  // customUserSectionId: number;
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
