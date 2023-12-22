export interface FormValues {
  firstName: string;
  lastName: string;
  pokemonTeam: string[];
}
export interface Request {
  name: string;
  img: string;
  url: string;
}

export interface Pokemon {
  value: string;
  label: string;
  image: string;
}

export interface PokemonListProps {
  pickedPokemons: Pokemon[];
}

export interface CustomStyles {
  control: (provided: any) => React.CSSProperties;
  multiValue: (provided: any) => React.CSSProperties;
  multiValueRemove: (provided: any) => React.CSSProperties;
  menu: (provided: any) => React.CSSProperties;
}
