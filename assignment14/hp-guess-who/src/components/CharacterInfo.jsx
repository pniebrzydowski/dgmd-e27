const CharacterInfo = ({ character }) => {
  return (
    <ul>
      <li>
        Role at Hogwarts: {character.hogwartsStaff && "Staff"}
        {character.hogwartsStudent && "Student"}
        {!character.hogwartsStaff && !character.hogwartsStudent && "None"}
      </li>
      {character.house && <li>Hogwarts House: {character.house}</li>}
      {character.gender} {character.ancestry} {character.species}
      {character.dateOfBirth && <li>Born: {character.dateOfBirth}</li>}
    </ul>
  );
};

export default CharacterInfo;
