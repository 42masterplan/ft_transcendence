export default function GameResult(players: {
  playerA: number;
  playerB: number;
}) {
  const {playerA, playerB} = players;
  return (
    <div>
      <h1>Game Over</h1>
      <h2>Player A: {playerA}</h2>
      <h2>Player B: {playerB}</h2>
    </div>
  );
}
