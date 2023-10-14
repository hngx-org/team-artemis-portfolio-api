export interface CertificateData {
  id?: number;
  title: string;
  year: string;
  organization: string;
  url?: string | null;
  description: string;
  created_at?: Date;
  user: {
    id: string;
  };
  section: {
    id: number;
  };
}

export interface UpdateCertificateInterface {
  title: string
  year: string
  organization: string
  url: string
  description: string   
}
