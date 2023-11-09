const express = require('express');
const next = require('next');
const http = require('http');
const socketIO = require('socket.io');

const port = 4242;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();

const players = [];

nextApp.prepare().then(() => {
  console.log('launched');
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server, {
    pingInterval: 2000,
    pingTimeout: 5000,
    cors: {
      origin: 'http://localhost:3000', // 클라이언트가 실행 중인 URL을 정확히 지정하세요
      methods: ['GET', 'POST']
    }
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
    //great place to create a player object
    //players.socket.id is referencing the socket id. not creating a new property
    //not allowing more than 2 players. if more than 2 players, warn them
    if (players.length >= 2) {
      socket.emit('err', {message: 'There are already 2 players'});
      return;
    }
    const player = {
      id: socket.id,
      x: 100,
      y: 100,
      color:
        players.length === 0 ? 'rgba(217, 217, 217, 1)' : 'rgba(0, 133, 255, 1)' //A : B 첫 번째로 추가되는 플레이어가 A다
    };
    players.push(player);
    if (players.length === 2) io.emit('updatePlayers', players);
    //disconnection part is independent
    socket.on('disconnect', (reason) => {
      console.log(reason);
      delete players[socket.id]; //player will be deleted on backend but not frontend so we emit
      io.emit('updatePlayers', players);
    });
    console.log(players);
  });

  app.use(express.static('public'));

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
