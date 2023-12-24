import React, { useState, useRef } from "react";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Pokemon from "../interfaces/PokemonInterface";

interface FormProps {
  choosedPokemons: Pokemon[]; 
  modalData: {
    firstName: string;
    lastName: string;
  };
}

const DraggablePokemon: React.FC<{
  id: number;
  pokemon: Pokemon;
  index: number;
  movePokemon: (fromIndex: number, toIndex: number) => void;
}> = ({ id, pokemon, index, movePokemon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: 'POKEMON',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'POKEMON',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        movePokemon(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="cursor-pointer p-4 border border-purple-500 mb-5 mt-5" key={pokemon.value}>
      <p className="text-center">{pokemon.value}</p>  
    </div>
  );
};

const Modal: React.FC<FormProps & { updateChoosedPokemons: (pokemons: Pokemon[]) => void }> = ({
  choosedPokemons,
  modalData,
  updateChoosedPokemons,
}) => {
  const { firstName, lastName } = modalData;
  const [pokemons, setPokemons] = useState([...choosedPokemons]);
  const [isSaving, setIsSaving] = useState(false);
  const [isShowModal, setIsShowModal] = useState(true);

  const movePokemon = (fromIndex: number, toIndex: number) => {
    const updatedPokemons = [...pokemons];
    const [movedPokemon] = updatedPokemons.splice(fromIndex, 1);
    updatedPokemons.splice(toIndex, 0, movedPokemon);
    setPokemons(updatedPokemons);
  };

  const handleSave = () => {
    updateChoosedPokemons([...pokemons]);
    setIsSaving(false);
    openCloseModal();
  };

  const handleClose = () => {
    setPokemons([...choosedPokemons]);
    openCloseModal();
  };

  const openCloseModal = () => {
    setIsShowModal(prev => !prev)
  };

  return (
    <>
    {isShowModal ? 
    <DndProvider backend={HTML5Backend}>
    <div className="">
      <div className="flex justify-between">
        <h2>{firstName} {lastName}</h2>
        <div className="close cursor-pointer" onClick={handleClose}>X</div>
      </div>

      {pokemons.map((pokemon, index) => (
        index === 3 ? (
          <React.Fragment key={pokemon.value}>
            <div className="w-full bg-purple-500 h-1"></div>
            <div className="border-purple-500 mt-5 flex justify-between items-center">
              <div className="w-2/3">
                <p className="text-center">
                  <DraggablePokemon
                    key={pokemon.value}
                    id={index}
                    index={index}
                    pokemon={pokemon}
                    movePokemon={movePokemon}
                  />
                </p>
              </div>
              <div className="cursor-pointer" onClick={handleClose}>cancel</div>
              <div
                className="
                  cursor-pointer
                  shadow 
                  bg-purple-700 
                  hover:bg-purple-400 
                  focus:shadow-outline 
                  focus:outline-none 
                  text-white font-bold 
                  py-2 px-4 
                  rounded
                  h-1/3"
                onClick={() => {
                  setIsSaving(true);
                  handleSave();
                }}
              >
                Save
              </div>
            </div>
          </React.Fragment>
          ) : (
            <DraggablePokemon
              key={pokemon.value}
              id={index}
              index={index}
              pokemon={pokemon}
              movePokemon={movePokemon}
            />
          )
        ))}
      </div>
    </DndProvider> : 
    <div className="flex justify-between items-center"><h2>{firstName} {lastName}</h2> <button className="
    cursor-pointer
    shadow 
    bg-purple-700 
    hover:bg-purple-400 
    focus:shadow-outline 
    focus:outline-none 
    text-white font-bold 
    py-2 px-4 
    rounded
    h-1/3" onClick={openCloseModal}>OPEN</button></div>}
    </>
  );
};

export default Modal;