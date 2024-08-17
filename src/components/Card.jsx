import "../styles/Card.css";

function Card({ card, handleCardClick }) {
  return (
    <div className="card" onClick={() => handleCardClick(card.id)}>
      <img src={card.imageUrl} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}

export default Card;
