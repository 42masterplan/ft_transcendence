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
