export interface EducationDetailData {
  degreeId: number
  fieldOfStudy: string
  school: string
  from: string
  description: string
  to: string
  userId: string
  sectionId: number
}

export interface UpdateEducationDetailDTO {
  fieldOfStudy?: string
  school?: string
  from?: string
  to?: string
  description?: string
  degreeId?: number
  userId?: string
  sectionId?: number
}