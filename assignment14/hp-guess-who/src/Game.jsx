import { useEffect, useState } from "react";
import CharacterInfo from "./components/CharacterInfo";
import CharacterSelect from "./components/CharacterList";
import GuessResult from "./components/GuessResult";
import NumberOfGuesses from "./components/NumberOfGuesses";

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === "function" ? predicate : (o) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

const Game = () => {
  const [characters, setCharacters] = useState([]);
  const [characterToGuess, setCharacterToGuess] = useState(null);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [lastGuess, setLastGuess] = useState(null);

  const isCharacterGuessed =
    lastGuess !== null && lastGuess.name === characterToGuess.name;

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(
        "https://hp-api.herokuapp.com/api/characters",
        {
          method: "GET",
        }
      ).then((res) => res.json());
      const filteredCharacters = response.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
      const uniqueCharacters = uniqBy(filteredCharacters, "name");
      setCharacters(uniqueCharacters);
    };

    getCharacters();
  }, []);

  const guessCharacter = (character) => {
    if (isCharacterGuessed) {
      if (
        window.confirm(
          "You have already guessed the character, do you want to play again?"
        )
      ) {
        startGame();
      }
      return;
    }
    setLastGuess(character);
    setNumberOfGuesses((prevState) => prevState + 1);
  };

  const startGame = () => {
    setNumberOfGuesses(0);
    setLastGuess(null);
    const idx = getRandomNumber(1, characters.length);
    setCharacterToGuess(characters[idx]);
  };

  return (
    <>
      {characterToGuess && (
        <section>
          <CharacterInfo character={characterToGuess} />
          <GuessResult
            lastGuess={lastGuess?.name}
            characterToGuess={characterToGuess?.name}
          />
          <NumberOfGuesses number={numberOfGuesses} />
        </section>
      )}

      {(!characterToGuess || isCharacterGuessed) && (
        <button type="button" onClick={startGame}>
          Start a New Game
        </button>
      )}

      {characters.length > 0 && characterToGuess && (
        <CharacterSelect characters={characters} onSelect={guessCharacter} />
      )}
    </>
  );
};

export default Game;
