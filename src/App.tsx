import React, { useEffect, useState } from 'react';
import Form from './components/form';
import axios from 'axios';
import Modal from './components/modal';
import { Pokemon } from './interfaces/PokemonInterface';

function App() {
  const [choosedPokemons, setChoosedPokemons] = useState<Pokemon[]>([]);
  const [options, setOptions] = useState<Pokemon[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<object>({
    firstName: '',
    lastName: '',
  });
  const [errorM, setErrorM] = useState<string>('');

  const showModal = () => {
    setIsModal(true);
  };

  const getModalData = (data: object) => {
    setModalData(data);
  };

  const addPokemon = (arr: Pokemon[]) => {
    setChoosedPokemons(arr);
  };

  const deletePokemon = (item: Pokemon) => {
    const updatedPokemons = choosedPokemons.filter((pokemon) => pokemon.name !== item.name);
    setChoosedPokemons(updatedPokemons);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const newOptions = response.data.results.map((item: { name: string }) => ({
          value: item.name,
          name: item.name,
        }));
        setOptions((prevOptions) => [...prevOptions, ...newOptions]);
      } catch (error) {
        setErrorM(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex items-center justify-center h-screen'>
      {errorM !== '' ? (
        errorM
      ) : (
        <div className='p-6 mx-auto bg-white rounded-xl shadow-md w-1/4'>
          {isModal ? (
            <Modal choosedPokemons={choosedPokemons} modalData={modalData} updateChoosedPokemons={setChoosedPokemons} />
          ) : (
            <Form
              choosedPokemons={choosedPokemons}
              addPokemon={addPokemon}
              deletePokemon={deletePokemon}
              options={options}
              showModal={showModal}
              getModalData={getModalData}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
