export interface EducationDetailData {
  degree_id: number;
  fieldOfStudy: string;
  school: string;
  from: string;
  description: string;
  to: string;
  user_id: string;
  section_id?: number;
}

export interface UpdateEducationDetailDTO {
  fieldOfStudy?: string;
  school?: string;
  from?: string;
  to?: string;
  description?: string;
  degree_id?: number;
  user_id?: string;
  section_id?: number;
}
