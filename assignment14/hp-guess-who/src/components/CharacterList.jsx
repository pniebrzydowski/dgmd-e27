import { useCombobox } from "downshift";
import { useState } from "react";

const CharacterSelect = ({ characters, onSelect }) => {
  const [inputItems, setInputItems] = useState([...characters]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (character) => character.name,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        characters.filter((character) =>
          character.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div className="characterSelect">
      <label {...getLabelProps()}>Guess a character:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li key={`${item.name}${index}`} {...getItemProps({ item, index })}>
              <button onClick={() => onSelect(item)}>{item.name}</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CharacterSelect;
