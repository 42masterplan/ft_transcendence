//API Get users/friends/{id}
export interface userType {
  id: string;
  profileImage: string;
  name: string;
  currentState: string;
  introduction: string;
}


export interface selectUserType {
  id: string;
  name: string;
  checked: boolean;
}
