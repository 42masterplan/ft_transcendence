export interface dmMessageType {
  _id: number;
  _content: string;
  _participantId: string;
  _dmId: string;
}

export interface dmInfoType {
  dmId: string; //uuid
  myId: string; //uuid
  myName: string;
  myProfileImage: string;
  FriendName: string;
  FriendProfileImage: string;
}
