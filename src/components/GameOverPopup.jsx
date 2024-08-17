import "../styles/GameOverPopup.css";

function GameOverPopup({ resetGame }) {
  return (
    <div className="game-over-popup">
      <div className="popup-content">
        <h2>Game Over!</h2>
        <p>You clicked the same card twice!</p>
        <button onClick={resetGame}>Restart</button>
      </div>
    </div>
  );
}

export default GameOverPopup;
