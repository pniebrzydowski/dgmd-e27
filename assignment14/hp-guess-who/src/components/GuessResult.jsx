const GuessResult = ({ lastGuess, characterToGuess }) => {
  if (!lastGuess) {
    return null;
  }

  <p>
    Your guess&mdash;<em>{lastGuess}</em>&mdash;is{" "}
    {lastGuess === characterToGuess ? "correct!" : "incorrect"}
  </p>;
};

export default GuessResult;
