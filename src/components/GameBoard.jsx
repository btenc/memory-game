import { useEffect } from "react";
import Card from "./Card";
import "../styles/GameBoard.css";

function GameBoard({ cards, setCards, handleCardClick }) {
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((response) => response.json())
      .then((data) => {
        const initialCards = data.results.map((item, index) => ({
          id: index,
          name: item.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));
        setCards(shuffleArray(initialCards));
      });
  }, [setCards]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card key={card.id} card={card} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
}

export default GameBoard;
