export interface dmMessageType {
  id: number;
  content: string;
  participantId: string;
  dmId: string;
  profileImage: string;
  name: string;
}

export interface dmInfoType {
  dmId: string; //uuid
  myId: string; //uuid
  myName: string;
  myProfileImage: string;
  FriendName: string;
  FriendProfileImage: string;
}
