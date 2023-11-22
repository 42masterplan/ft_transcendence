import {User} from './User';
import {DMType} from '../types';

export class DM {
  id: string;
  senderInfo: User;
  receiverInfo: User;
  content: string;
  sendTime: Date;
  isReceivedMessage: boolean;
  constructor(props: DMType, myName: string) {
    this.id = props.id;
    this.senderInfo = new User();
    this.senderInfo.name = props.senderName;
    this.senderInfo.profileImage = props.senderProfileImage;
    this.receiverInfo = new User();
    this.receiverInfo.name = props.receiverName;
    this.receiverInfo.profileImage = props.receiverProfileImage;
    this.content = props.content;
    this.sendTime = props.sendTime;
    if (this.senderInfo.name === myName) {
      this.isReceivedMessage = false;
    } else {
      this.isReceivedMessage = true;
    }
  }
}
