import React, { Dispatch, SetStateAction } from "react";
import PokemonList from "./PockemontList";
import { Pokemon } from "./interfaces/interfaces";

type ModalProps = {
    pickedPokemons: Pokemon[]
    onSave: () => void
    setModal: Dispatch<SetStateAction<boolean>>
  };

const Modal: React.FC<ModalProps> = ({pickedPokemons, onSave, setModal}) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-20 ">
      <div className="modal-window bg-white p-7 rounded-md min-w-[500px] min-h-[600px] sm:w-full sm:h-full flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-neutral-950 font-bold text-4xl p-3 mb-10">
            Your pokemons
          </h1>
          <div
            className="h-10 w-10 flex items-center justify-center cursor-pointer rounded-[50%] hover:bg-[#C2C2C2]"
            onClick={() => setModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col flex-grow sm:m-5">
          <PokemonList pickedPokemons={pickedPokemons} />
        </div>
        <div className="flex justify-center gap-5">
          <button
            onClick={() => setModal(false)}
            className="text-neutral-950 text-lg py-1 px-4 font-medium rounded-md hover:bg-[#CCCCCC] duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="text-white text-lg bg-[#4724c7] hover:bg-[#6466F1] py-1 px-4 font-medium rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
