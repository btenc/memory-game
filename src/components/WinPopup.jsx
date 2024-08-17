import "../styles/WinPopup.css";

function WinPopup({ resetGame }) {
  return (
    <div className="win-popup">
      <div className="popup-content">
        <h2>Congratulations!</h2>
        <p>You won the game by scoring 12 points!</p>
        <button onClick={resetGame}>Play Again</button>
      </div>
    </div>
  );
}

export default WinPopup;
