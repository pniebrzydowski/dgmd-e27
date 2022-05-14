const GuessResult = ({ lastGuess, characterToGuess }) => {
  if (!lastGuess) {
    return null;
  }

  return (
    <p>
      Your last guess&mdash;<em>{lastGuess}</em>&mdash;was{" "}
      {lastGuess === characterToGuess ? "correct!" : "incorrect"}
    </p>
  );
};

export default GuessResult;
