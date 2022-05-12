const CharacterSelect = ({ characters, onSelect }) => (
  <section>
    <h2>Guess a character</h2>
    <ul className="characterSelect">
      {characters.map((character) => (
        <li key={character.name}>
          <button onClick={() => onSelect(character)}>{character.name}</button>
        </li>
      ))}
    </ul>
  </section>
);

export default CharacterSelect;
