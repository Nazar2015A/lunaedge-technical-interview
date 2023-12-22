import { useEffect, useMemo, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import MultiSelect from "./components/Select";
import axios from "axios";
import {
  FormValues,
  Pokemon,
  Request,
} from "./components/interfaces/interfaces";
import Button from "./components/Button";
import toast, { Toaster } from "react-hot-toast";
import InfoIcon from "./components/InfoIcon";
import Modal from "./components/Modal";

function App() {
  const methods = useForm<FormValues>();
  const [firstNameError, setFirstNameError] = useState<string | null>("");
  const [lastNameError, setLastNameError] = useState<string | null>("");
  const [pokemonList, setPokemonList] = useState<Request[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [pickedPokemons, setPickedPockemons] = useState<Pokemon[]>([]);

  const getValidationRules = (fieldName: string) => {
    switch (fieldName) {
      case "FirstName":
      case "LastName":
        return { pattern: /^[a-zA-Z]{2,12}$/, message: `Invalid ${fieldName}` };
      default:
        return {};
    }
  };

  const validateField = (value: string, fieldName: string) => {
    const { pattern, message } = getValidationRules(fieldName);
    const isValid = pattern ? pattern.test(value) : true;
    return isValid ? null : message;
  };

  const validateFirstName = (value: string) => {
    const error = validateField(value, "FirstName");
    setFirstNameError(error as string | null);
    return !error;
  };

  const validateLastName = (value: string) => {
    const error = validateField(value, "LastName");
    setLastNameError(error as string | null);
    return !error;
  };

  const watchFirstName = methods.watch("firstName");
  const watchLastName = methods.watch("lastName");

  useEffect(() => {
    if (watchFirstName !== undefined && watchFirstName !== "") {
      validateFirstName(watchFirstName);
    }
  }, [watchFirstName]);

  useEffect(() => {
    if (watchLastName !== undefined && watchLastName !== "") {
      validateLastName(watchLastName);
    }
  }, [watchLastName]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon: Request) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              img: pokemonResponse.data.sprites.front_default,
            };
          })
        );
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Failed to fetch Pokemon data", error);
      }
    };

    fetchPokemonList();
  }, []);

  const pokemonOptions = useMemo(() => {
    return pokemonList.map((pokemon: Request) => ({
      value: pokemon.name,
      label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      image: pokemon.img,
    }));
  }, [pokemonList]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const firstNameError = validateField(data.firstName, "firstName");
    const lastNameError = validateField(data.lastName, "lastName");
    const pokemonTeamError = methods.formState.errors.pokemonTeam?.message;

    if (firstNameError || lastNameError || pokemonTeamError) {
      return;
    } else {
      setModal(true);

      const updatedPickedPokemons = data.pokemonTeam.map(
        (pickedPokemon: any) => {
          const correspondingPokemon = pokemonList.find(
            (pok: any) => pok.name === pickedPokemon.value
          );
          if (correspondingPokemon) {
            return {
              ...pickedPokemon,
              url: correspondingPokemon.url,
            };
          }

          return pickedPokemon;
        }
      );

      setPickedPockemons(updatedPickedPokemons);
    }
  };

  const handleOverlayClick = (e: Event) => {
    if (!(e.target as HTMLElement).closest(".modal-window")) {
      setModal(false);
    }
  };

  useEffect(() => {
    if (modal) {
      document.addEventListener("click", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [modal]);

  const onSave = () => {
    methods.reset();

    methods.setValue("firstName", "");
    methods.setValue("lastName", "");
    methods.setValue("pokemonTeam", []);

    setFirstNameError("");
    setLastNameError("");

    setModal(false);
    toast.success('Your Pokémons have been saved!', {
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="p-6 bg-white rounded-md shadow-md"
        >
          <div className="mb-6 flex flex-col gap-[4px]">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              First Name
              <InfoIcon type='FirstName' />
            </label>
            <Controller
              name="firstName"
              control={methods.control}
              defaultValue=""
              rules={getValidationRules("firstName")}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={
                      !firstNameError
                        ? `px-[12px] py-[8px] w-full border-[2px] rounded-md outline-none hover:border-2 hover:border-[#6466F1] focus:border-[#4724C7]`
                        : `px-[12px] py-[8px] w-full border-[2px] border-[#D45246] rounded-md outline-none`
                    }
                    onChange={(e) => {
                      field.onChange(e);
                      validateFirstName(e.target.value);
                    }}
                  />
                  {firstNameError && (
                    <p className="text-red-500 text-sm mt-1">
                      {firstNameError}
                    </p>
                  )}
                  {!fieldState.error && !firstNameError && (
                    <p className="text-gray-500 text-sm mt-1">
                      This is a help text
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-6 flex flex-col gap-[4px]">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              Last Name
              <InfoIcon type='LastName' />
            </label>
            <Controller
              name="lastName"
              control={methods.control}
              defaultValue=""
              rules={getValidationRules("lastName")}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={
                      !lastNameError
                        ? `px-[12px] py-[8px] w-full border-[2px] rounded-md outline-none hover:border-2 hover:border-[#6466F1] focus:border-[#4724C7]`
                        : `px-[12px] py-[8px] w-full border-[2px] border-[#D45246] rounded-md outline-none`
                    }
                    onChange={(e) => {
                      field.onChange(e);
                      validateLastName(e.target.value);
                    }}
                  />
                  {lastNameError && (
                    <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
                  )}
                  {!fieldState.error && !lastNameError && (
                    <p className="text-gray-500 text-sm mt-1">
                      This is a help text
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <MultiSelect
            name="pokemonTeam"
            label="Pokemon Team"
            options={pokemonOptions}
            firstNameError={firstNameError}
            lastNameError={lastNameError}
            setFirstNameError={setFirstNameError}
            setLastNameError={setLastNameError}
          />
          <div className="flex justify-center">
            <Button type="primary" size="base" />
          </div>
        </form>
      </FormProvider>
      {modal && <Modal pickedPokemons={pickedPokemons} onSave={onSave} setModal={setModal} />}
      <Toaster />
    </div>
  );
}

export default App;
