const CharacterInfo = ({ character, cluesToShow, showPersonalInfo }) => {
  const clues = [];
  if (character.gender || character.ancestry || character.species) {
    clues.push(
      <li key="gender-ancestry-species">
        {[character.gender, character.ancestry, character.species].join(" ")}
      </li>
    );
  }
  clues.push(
    <li key="hogwarts-role">
      Role at Hogwarts: {character.hogwartsStaff && "Staff"}
      {character.hogwartsStudent && "Student"}
      {!character.hogwartsStaff && !character.hogwartsStudent && "None"}
    </li>
  );
  if (character.house) {
    clues.push(<li key="hogwarts-house">{character.house}</li>);
  }
  if (character.dateOfBirth) {
    clues.push(<li key="date-of-birth">Born: {character.dateOfBirth}</li>);
  }
  if (character.wand?.wood) {
    clues.push(
      <li key="wand">
        Wand: {character.wand.length} inches, {character.wand.wood} with a{" "}
        {character.wand.core} core
      </li>
    );
  }
  if (character.patronus) {
    clues.push(<li key="patronus">Patronus shape: {character.patronus}</li>);
  }
  if (character.eyeColour || character.hairColour) {
    const features = [];
    if (character.hairColour) {
      features.push(`${character.hairColour} hair`);
    }
    if (character.eyeColour) {
      features.push(`${character.eyeColour} eyes`);
    }
    clues.push(<li key="features">{features.join(", ")}</li>);
    if (character.alternate_names.length > 0) {
      clues.push(
        <li key="alternate-names">
          Also known as: {[character.alternate_names.join(", ")]}
        </li>
      );
    }
    if (character.actor) {
      const actors = [character.actor];
      if (character.alternate_actors) {
        actors.concat(character.alternate_actors);
      }
      clues.push(<li>Actor(s): {[actors].join(", ")}</li>);
    }
    if (character.image) {
      clues.push(
        <li>
          <img src={character.image} alt="Portrait of the character to guess" />
        </li>
      );
    }
  }

  const visibleClues = clues.slice(0, Math.min(cluesToShow, clues.length));

  return (
    <div className="characterInfo">
      <p>
        Clues: {visibleClues.length} of a possible {clues.length}
      </p>
      <ol>{visibleClues.map((clue, idx) => clue)}</ol>
      {showPersonalInfo && (
        <div>
          <h3>{character.name}</h3>
          {character.img && (
            <img src={character.img} alt={`Portrait of ${character.name}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterInfo;
