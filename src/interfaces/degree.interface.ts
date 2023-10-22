export interface DegreeData {
  type: string
}

export interface UpdateDegreeResponse {
  message: string
  data: {
    id: number
    type: string
  }
}
