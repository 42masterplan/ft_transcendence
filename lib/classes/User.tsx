import {userStatus} from '@/lib/types';

export class User {
  id: string; // UUID
  name: string; // max 10 characters
  profileImage: string;
  currentStatus: userStatus;
  introduction: string; // max 50 characters
  friendList: string[]; // userId[]
  blockList: string[]; // userId[]
  constructor() {
    this.id = '';
    this.name = '';
    this.profileImage = '';
    this.currentStatus = 'Offline';
    this.introduction = '';
    this.friendList = [];
    this.blockList = [];
  }
}
