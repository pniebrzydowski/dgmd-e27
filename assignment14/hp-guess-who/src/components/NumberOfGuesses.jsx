const NumberOfGuesses = ({ number }) =>
  number === 0 ? null : <p>Number of Guesses: {number}</p>;

export default NumberOfGuesses;
