import React, { useState, useEffect } from 'react';
import Select, { ValueType, OptionTypeBase, ActionMeta, components } from 'react-select';
import { Pokemon } from '../interfaces/PokemonInterface'; 

interface Option {
  label: string;
  value: string;
}

interface FormProps {
  addPokemon: (item: Pokemon[]) => void;
  deletePokemon: (item: Pokemon) => void;
  choosedPokemons: Pokemon[];
  options: Pokemon[];
  choosedPokemonsError: string;
}

const MultiSelectInput: React.FC<FormProps> = ({ options, addPokemon, deletePokemon, choosedPokemons, choosedPokemonsError }) => {
  const maxSelection = 4;
  const [sortBy, setSortBy] = useState<string>('');
  const [sortedOptions, setSortedOptions] = useState<Option[]>([]);

  useEffect(() => {
    const transformedOptions: Option[] = options.map((item) => ({
      label: item.name,
      value: item.value,
    }));

    setSortedOptions(transformedOptions.sort((a, b) => {
      if (sortBy === 'a-z') {
        return a.label.localeCompare(b.label);
      } else if (sortBy === 'z-a') {
        return b.label.localeCompare(a.label);
      }
      return 0; 
    }));
  }, [sortBy, options]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? 'purple' : '#E5E7EB',
      '&:hover': {
        borderColor: state.isFocused ? '#7C3AED' : '#E5E7EB',
      },
    }),
    multiValue: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#D9DDDC',
      border: 'none',
      borderRadius: '20px',
      padding: "2px 10px"
    }),
    multiValueRemove: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }),
  };

  const handleDelete = (removedValue: Option, actionMeta: ActionMeta<OptionTypeBase>) => {
    if (actionMeta.action === 'remove-value' || actionMeta.action === 'pop-value') {
      const removedPokemon = choosedPokemons.find((pokemon) => pokemon.name === removedValue.label);
      if (removedPokemon) {
        deletePokemon(removedPokemon);
      }
    }
  };

  const MultiValueRemove: React.FC<any> = (props) => (
    <components.MultiValueRemove {...props}>
      <span onClick={(e) => handleDelete(props.data, props.innerProps)}>×</span>
    </components.MultiValueRemove>
  );

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>Sort by</div>
        <div className='flex'>
          <div
            className="cursor-pointer shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-2"
            onClick={() => setSortBy('a-z')}
          >
            A-Z
          </div>
          <div
            className="cursor-pointer shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-2 mb-2"
            onClick={() => setSortBy('z-a')}
          >
            Z-A
          </div>
        </div>
      </div>
      <Select
        isMulti
        options={sortedOptions}
        styles={customStyles}
        value={choosedPokemons}
        onChange={(selected: ValueType<Option, true>) => {
          if (selected && selected.length <= maxSelection) {
            addPokemon(selected);
          }
        }}
        components={{ MultiValueRemove }}
      />
      {choosedPokemonsError === '' ? '' : <p className="text-red-500 text-xs mt-2">{choosedPokemonsError}</p>}
    </>
  );
};

export default MultiSelectInput;
