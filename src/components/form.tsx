import React, { useState } from "react";
import MultiSelectInput from "./multiselect";
import Signupbtn from "./signupbtn";
import FormInput from "./forminput";
import Pokemon from "../interfaces/PokemonInterface";

interface FormProps {
  choosedPokemons: Pokemon[];
  addPokemon: (items: Pokemon[]) => void;
  deletePokemon: (item: Pokemon) => void;
  showModal: () => void;
  getModalData: (data: object) => void;
  options: Pokemon[];
}

const Form: React.FC<FormProps> = ({ choosedPokemons, addPokemon, deletePokemon, options, getModalData, showModal }) => {
  const [formData, setFormData] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  const [choosedPokemonsError, setChoosedPokemons] = useState<string>('')
  const [isNameInputValid, setNameIsInputValid] = useState<boolean>(true)
  const [isLastNameInputValid, setLastNameIsInputValid] = useState<boolean>(true)

  const handleSave = (value: string, inputName: string) => {
    setFormData((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleSubmit = () => {
    const {firstName, lastName} = formData;
    if(firstName.length < 2 || lastName.length < 2 || choosedPokemons.length !== 4) {
      if(firstName.length < 2) setNameIsInputValid(false);
      if(lastName.length < 2) setLastNameIsInputValid(false);
      if(choosedPokemons.length !== 4) setChoosedPokemons("Exactly 4 elements required in choosedPokemons");
      return;
    }
    getModalData(formData)
    showModal()
  };

  return (
    <>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <FormInput inputName="firstName" handleSave={handleSave} isInputValid={isNameInputValid}/>
        <FormInput inputName="lastName" handleSave={handleSave} isInputValid={isLastNameInputValid}/>
        <MultiSelectInput
          choosedPokemons={choosedPokemons}
          addPokemon={addPokemon}
          deletePokemon={deletePokemon}
          options={options}
          choosedPokemonsError={choosedPokemonsError}
        />
        <Signupbtn handleSubmit={handleSubmit} />
      </form>
    </>
  );
};

export default Form;