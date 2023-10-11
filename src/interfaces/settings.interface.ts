export interface NotificationSettings {
  id: number;
  emailSummary: boolean | null;
  specialOffers: boolean | null;
  communityUpdate: boolean | null;
  followUpdate: boolean | null;
  newMessages: boolean | null;
  userId: string;
}

export interface UserSettings {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  sectionOrder?: string;
  password: string;
  provider?: string;
  isVerified?: boolean;
  twoFactorAuth?: boolean;
  profilePic?: string;
  refreshToken?: string;
  createdAt?: Date;
  socialUsers?: string;
}
