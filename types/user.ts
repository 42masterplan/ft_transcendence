//API Get users/friends/{id}
export interface userType {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: string;
  introduction: string;
}

export interface selectUserType {
  id: string;
  name: string;
  checked: boolean;
}

export type userStatusType = 'on-line' | 'off-line' | 'in-Game' | 'AFK';

export type userInfoType = {
  id: string; // UUID
  name: string; // max 10 characters
  profileImage: string;
  currentStatus: userStatusType;
  introduction: string; // max 50 characters
  friendList: string[]; // userId[]
  blockList: string[]; // userId[]
};
