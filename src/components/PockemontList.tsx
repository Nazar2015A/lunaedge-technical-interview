import React from "react";
import { PokemonListProps } from "./interfaces/interfaces";

const PokemonList: React.FC<PokemonListProps> = ({ pickedPokemons }) => {

  return (
    <ul className="grid grid-cols-[1fr,1fr] gap-5">
      {pickedPokemons.map((pokemon, index) => (
        <li className="shadow-md" key={index}>
          <h1 className="capitalize text-center w-full font-semibold">{pokemon.label}</h1>
          <div className="flex justify-center">
            <img className="w-35 h-35" src={pokemon.image} alt={`Image of ${pokemon.value}`} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
