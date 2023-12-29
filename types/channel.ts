export interface PublicRoomType {
  name: string;
  userCount: number;
  isPassword: boolean;
  id: string;
}

export interface EngagedChannelType {
  id: string; //random uuid
  name: string; //채널방 이름
  userCount: number; //현재 참여중인 유저 수
  role: 'owner' | 'admin' | 'user' | ''; //내가 채널방에서의 역할
  isUnread?: boolean; //읽지 않은 메세지가 있는지
}

export interface MsgHistoryType {
  id: string; //random uuid
  createdAt?: Date; //채팅이 생성된 시간
  name: string; //채팅을 보낸 사람의 이름
  profileImage: string; //채팅을 보낸 사람의 프로필 사진
  content: string; //채팅 내용
}

export interface channelStateType {
  channelName: string;
  channelId: string;
  engagedChannels: EngagedChannelType[];
  myProfileImage: string;
  myName: string;
  myId: string;
}
