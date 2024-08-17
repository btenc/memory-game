import { useState, useEffect, useCallback, useRef } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import GameOverPopup from "./components/GameOverPopup";
import WinPopup from "./components/WinPopup";
import "./styles/App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false); // State for detecting a win

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomPokemonIds = (count, max) => {
    const ids = new Set();
    while (ids.size < count) {
      const randomId = Math.floor(Math.random() * max) + 1;
      ids.add(randomId);
    }
    return [...ids];
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNewPokemon = useCallback(() => {
    const pokemonIds = getRandomPokemonIds(12, 898);
    const requests = pokemonIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
        response.json()
      )
    );

    Promise.all(requests).then((results) => {
      const newCards = results.map((item) => ({
        id: item.id,
        name: capitalizeFirstLetter(item.name),
        imageUrl: item.sprites.front_default,
      }));
      setCards(shuffleArray(newCards));
      setGameOver(false);
      setWin(false); // Reset win state when fetching new Pokémon
    });
  }, []);

  const fetchNewPokemonRef = useRef(fetchNewPokemon);

  useEffect(() => {
    fetchNewPokemonRef.current();
  }, []);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setGameOver(true);
    } else {
      setScore(score + 1);
      setClickedCards([...clickedCards, id]);

      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }

      // Check for win condition
      if (score + 1 === 12) {
        setWin(true);
      } else {
        // Shuffle the cards after each click if the player hasn't won yet
        setCards((prevCards) => shuffleArray([...prevCards]));
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
    fetchNewPokemonRef.current();
  };

  return (
    <div className="App">
      <header>
        <h1>PokeMemory</h1>
      </header>
      <ScoreBoard score={score} bestScore={bestScore} />
      <div className={`GameBoard ${gameOver || win ? "disabled" : ""}`}>
        <GameBoard cards={cards} handleCardClick={handleCardClick} />
      </div>
      {gameOver && <GameOverPopup resetGame={resetGame} />}
      {win && <WinPopup resetGame={resetGame} />} {/* Display win screen */}
      <button className="refresh-button" onClick={resetGame}>
        Refresh
      </button>
      <footer>
        <p>
          Powered by{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokeAPI
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
