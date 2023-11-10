import http from 'http';
import {Server} from 'socket.io';
import {instrument} from '@socket.io/admin-ui';
import express from 'express';

const corsOrigin = 'http://localhost:4001';
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

function publicRooms() {
  const {
    sockets: {
      adapter: {sids, rooms}
    }
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on('connection', (socket) => {
  socket['nickname'] = 'Anon';
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));
    wsServer.sockets.emit('room_change', publicRooms()); //모든 유저에게 보내는 board casting
    //이걸로 채팅방 알림 구현 가능할듯.
  });

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
  socket.on('new_message', (msg, room, done) => {
    console.log(wsServer.sockets.adapter);
    socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});
