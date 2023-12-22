import React from "react";
import { Tooltip } from 'react-tooltip'

type IconProps = {
  type: "FirstName" | "LastName" | "PokemonTeam";
};

const InfoIcon: React.FC<IconProps> = ({type}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        data-slot="icon"
        className="w-5 h-5 cursor-pointer hover:fill-black hover:text-white"
        data-tooltip-id="my-tooltip" data-tooltip-content={type === "FirstName" || type === "LastName" ? "Only English letters 2-12, a-z and A-Z!" : "Select 4 pokemons for your team!"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        data-slot="icon"
        className="w-6 h-6 cursor-pointer"
      ></svg>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default InfoIcon;
