export default function Game() {
  // ... 기존 변수 선언 ...

  const [roomId, setRoomId] = useState(null); // 현재 방의 ID

  useEffect(() => {
    const socket = io('http://localhost:4242');
    // ... 기존 코드 ...

    // 방 ID 설정
    socket.on('joinedRoom', (id) => {
      setRoomId(id);
    });

    // 업데이트 이벤트 리스너
    socket.on('updatePlayers', (data) => {
      if (data.roomId !== roomId) return; // 현재 방이 아니면 무시
      // ... 플레이어 상태 업데이트 로직 ...
    });

    socket.on('updateBall', (data) => {
      if (data.roomId !== roomId) return; // 현재 방이 아니면 무시
      // ... 볼 상태 업데이트 로직 ...
    });

    // ... 나머지 이벤트 리스너 ...

    // ... 나머지 코드 ...
  }, []);

  // ... 나머지 코드 ...
}
