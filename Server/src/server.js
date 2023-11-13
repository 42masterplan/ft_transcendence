import http from 'http';
import {Server} from 'socket.io';
import {instrument} from '@socket.io/admin-ui';
import express from 'express';
import {PublicRoomList} from './dummy.js';

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

//-------------서버 실행 -----------

// function publicRooms() {
//   const {
//     sockets: {
//       adapter: {sids, rooms}
//     }
//   } = wsServer;
//   const publicRooms = [];
//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });
//   return publicRooms;
// }

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

const createChannel = (
  {channelName, password, invitedFriendIds, type},
  done
) => {
  socket.join(channelName);
  //추후 초대된 모든 유저들을 전부 join으로 넣어줘야하고, private 방도 처리해줘야함
  if (type === 'Public') {
    if (
      PublicRoomList.find((room) => room.channelName === channelName) ===
      undefined
    ) {
      //공개 방이고 존재하지 않는 방이면
      PublicRoomList.push({
        channelName: channelName,
        userCount: invitedFriendIds.length + 1, //나까지 포함해서 +1
        isPassword: password !== '',
        channelId: channelName
      });
      done(); //똑바로 끝나서 클라이언트 콜백 함수 호출
    } else {
      //이미 존재하는 방이면 에러 출력
      socket.emit('error_exist', '이미 존재하는 방입니다.');
      PublicRoomList.find(
        (room) => room.channelName === channelName
      ).userCount += 1;
    }
  } else {
    //비공개 방이면
    done();
  }
  // socket
  //   .to(channelName)
  //   .emit('welcome', socket.nickname, countRoom(roomName));
  // wsServer.sockets.emit('room_change', publicRooms()); //모든 유저에게 보내는 board casting
  //이걸로 채팅방 알림 구현 가능할듯.
};

wsServer.on('connection', (socket) => {
  socket['nickname'] = 'Anon';
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  // 모든 public channel 을 보내주는 이벤트
  socket.on('allPublicChannel', () => {
    socket.emit('allPublicChannel', PublicRoomList);
  });
  socket.on('createChannel', createChannel);

  //이건 끊기기 직전에 발생하는 이벤트
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1)
    );
  });

  //이건 진짜 끊겼을떄
  socket.on('disconnect', () => {
    wsServer.sockets.emit('room_change', publicRooms());
  });

  //인자에 어떤 Room인지 방 이름 들어감
  socket.on('message', (msg, done) => {
    // console.log(wsServer.sockets.adapter);
    socket.emit('message', `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});
