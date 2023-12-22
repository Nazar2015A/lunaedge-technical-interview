import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { CustomStyles } from "./interfaces/interfaces";
import InfoIcon from "./InfoIcon";

interface SelectProps {
  name: string;
  label: string;
  options: { value: string; label: string; image: string }[];
  firstNameError: string | null;
  lastNameError: string | null;
  setFirstNameError: React.Dispatch<React.SetStateAction<string | null>>;
  setLastNameError: React.Dispatch<React.SetStateAction<string | null>>;
}

const OptionWithImage: React.FC<any> = (props) => {
  const { label, image } = props.data;
  
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {label}
        {image && <img src={image} alt={label} style={{ width: '40px', height:'40px', marginRight: '8px' }} />}
      </div>
    </components.Option>
  );
};

const MultiSelect: React.FC<SelectProps> = ({
  name,
  label,
  options,
  firstNameError,
  lastNameError,
  setFirstNameError,
  setLastNameError,
}) => {
  const { control, setValue, formState, trigger } = useFormContext();
  const { errors } = formState;

  const validatePokemonSelection = (selectedOptions: any[]) => {
    if (firstNameError === '') {
      setFirstNameError("Invalid First Name");
    }
    if (lastNameError === '') {
      setLastNameError("Invalid Last Name");
    }
    if (selectedOptions?.length !== 4) {
      return "Please select 4 Pokemons";
    }
    return true;
  };

  const handleChange = async (selectedOptions: any) => {
    setValue(name, selectedOptions);
    await trigger(name);
  };

  const errorMessage = errors[name]?.message;

  const customStyles:CustomStyles = {
    control: (provided) => ({
      ...provided,
      border: errorMessage ? "2px solid #D45246" : "2px solid #E5E7EB",
      borderRadius: "0.375rem",
      boxShadow: "none",
      "&:hover": {
        border: errorMessage ? "2px solid #D45246" : "2px solid #6466F1",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: "15px",
      padding: '2px 10px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      width: '25px',
      height: '25px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      "&:hover": {
        backgroundColor: "#ccc",
        borderRadius: "50%",
        "& svg": {
          fill: "black",
        },
      },
    }),
    menu: (provided) => ({
      ...provided,
    }),
  };

  const customTheme = (theme:any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "#eef2ff",
      primary: "#6466f1",
    },
  });

  return (
    <div className="relative mb-6 flex flex-col gap-[4px]">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
      >
        {label}
        <InfoIcon type='PokemonTeam' />
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ validate: validatePokemonSelection }}
        render={({ field }) => (
          <div>
            <Select
              {...field}
              isMulti
              options={options}
              className="basic-multi-select w-[400px]"
              classNamePrefix="select"
              onChange={handleChange}
              styles={customStyles as any}
              theme={customTheme}
              components={{ Option: OptionWithImage }}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage as any}</p>
            )}
          </div>
        )}
      />
      {!errorMessage && (
        <p className="text-gray-500 text-sm mt-1">This is a help text</p>
      )}
    </div>
  );
};

export default MultiSelect;
