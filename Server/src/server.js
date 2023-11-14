import http from 'http';
import {Server} from 'socket.io';
import {instrument} from '@socket.io/admin-ui';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {
  PublicRoomList,
  EngagedChannels,
  channelHistory,
  myRoles
} from './dummy.js';

const corsOrigin = 'http://localhost:3000';
//---------------서버 실행----------------
const app = express();

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io', corsOrigin],
    credentials: true
  }
});
instrument(wsServer, {
  auth: false
});
const handleListen = () => console.log(`Listening on http://localhost:4001`);
httpServer.listen(4001, handleListen);

//-------------서버 실행 -----------------

wsServer.on('connection', (socket) => {
  socket['username'] = 'Anon';
  socket['userId'] = 'Anon';
  socket['profileImage'] = 'Anon';
  //처음 들어오면 이미 join된 상태인 room에 join해줍니다.
  socket.join(EngagedChannels.map((channel) => channel.id));
  //연결 되자마자 유저 정보를 얻어옵니다.
  // socket.emit('setUserInfo');
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
    socket.emit('setUserInfo');
  });

  //현재 참여중인 채널을 보내주는 이벤트
  socket.on('myChannels', () => {
    socket.emit('myChannels', EngagedChannels);
  });

  socket.on('channelHistory', ({roomid}) => {
    socket.emit('channelHistory', channelHistory[roomid]);
  });

  //해당 채널에서 나의 역활
  socket.on('myRole', (roomid) => {
    socket.emit('myRole', myRoles[roomid]);
  });

  socket.on('newMessage', (msg, roomid, done) => {
    channelHistory[roomid].push({
      id: socket.userId,
      name: socket.username,
      profileImage: socket.profileImage,
      content: msg
    });
    socket.to(roomid).emit('newMessage', roomid, {
      id: socket.userId,
      name: socket.username,
      profileImage: socket.profileImage,
      content: msg
    });
    done();
  });

  socket.on('setUserInfo', ({username, userId, profileImage}) => {
    socket['username'] = username;
    socket['userId'] = userId;
    socket['profileImage'] = profileImage;
  });

  // 모든 public channel 을 보내주는 이벤트
  socket.on('allPublicChannel', () => {
    socket.emit('allPublicChannel', PublicRoomList);
  });

  //public Channel 에 참여하는 경우
  socket.on('joinChannel', ({id, password}, done) => {
    socket.join(id);
    done();
    //참여중 채널 목록 업데이트
    EngagedChannels.push(PublicRoomList.find((room) => room.id === id));
    socket.emit('myChannels', EngagedChannels);
  });

  //채널이 생성된 순간 이벤트
  socket.on(
    'createChannel',
    ({channelName, password, invitedFriendIds, type}, done) => {
      if (channelName === '')
        return socket.emit('error_exist', '방 이름을 입력해주세요.');
      socket.join(channelName);
      myRoles[channelName] = 'owner';
      channelHistory[channelName] = [];
      //초대된 모든 유저들을 전부 join으로 넣어줘야합니다!
      //현재 참여 중인 채널목록 업데이트
      //여기서 하는게 옳은건 아닌데 backend 코드 추가하면서 변경해주세요.
      EngagedChannels.push({
        id: channelName,
        channelName: channelName,
        userCount: invitedFriendIds.length + 1,
        isUnread: false
      });
      if (type === 'Public') {
        if (!PublicRoomList.find((room) => room.channelName === channelName)) {
          //공개 방이고 존재하지 않는 방이면
          PublicRoomList.push({
            channelName: channelName,
            userCount: invitedFriendIds.length + 1, //나까지 포함해서 +1
            isPassword: password !== '',
            id: channelName
          });
          done(); //똑바로 끝나서 클라이언트 콜백 함수 호출
          //참여중 채널 목록 업데이트
          socket.emit('myChannels', EngagedChannels);
        } else {
          //이미 존재하는 방이면 에러 출력
          socket.emit('error_exist', '이미 존재하는 방입니다.');
          PublicRoomList.find(
            (room) => room.channelName === channelName
          ).userCount += 1;
        }
      } else {
        //비공개 방이면 => 여기서 private room도 에러 처리해주세요
        done();
        //참여중 채널 목록 업데이트
        socket.emit('myChannels', EngagedChannels);
      }
    }
  );
});
