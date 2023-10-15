export interface NotificationSettings {
  id?: number;
  emailSummary?: boolean;
  specialOffers?: boolean;
  communityUpdate?: boolean;
  followUpdate?: boolean;
  newMessages?: boolean;
  user: UserSettings;
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

export interface NotificationSetting {
  id: number;
  newMessages: boolean;
  portfolioUpdates: boolean;
  userId: string;
}
