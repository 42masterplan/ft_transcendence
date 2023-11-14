export interface PublicRoomType {
  channelName: string;
  userCount: number;
  isPassword: boolean;
  channelId: string;
}

export interface EngagedChannelType {
  id: string; //random uuid
  channelName: string; //채널방 이름
  userCount: number; //현재 참여중인 유저 수
  isUnread?: boolean; //읽지 않은 메세지가 있는지
}

export interface ChannelHistoryType {
  id: string; //random uuid
  createdAt: Date; //채팅이 생성된 시간
  name: string; //채팅을 보낸 사람의 이름
  profileImage: string; //채팅을 보낸 사람의 프로필 사진
  content: string; //채팅 내용
  isBlocked: boolean;
}
