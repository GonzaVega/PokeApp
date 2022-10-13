import React, { useState } from "react";
import PokemonList from "./PokemonList";

const PokemonTypeFilter = (props) => {
  const [filtered, setFiltered] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isFiltered, setIsFiltered] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const pokemonInputHandler = (event) => {
    setFiltered(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsValid(true);
    }
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
    if (filtered.trim() === "") {
      setIsValid(false);
    }
  };
  const typeFilterHandler = (event) => {
    event.preventDefault();
    setIsTouched(true);

    if (filtered.trim() === "") {
      setIsValid(false);
      return;
    }

    const filteredPokemon = props.pokemonTypes.filter(
      (type) => type.name === filtered.toLowerCase().trim("")
    );

    setIsFiltered(true);

    if (filteredPokemon.length === 0) {
      setIsFiltered(false);
    }

    return setPokemon(filteredPokemon);
  };
  const inputIsInvalid = !isValid && isTouched;
  const inputIsNotFiltered = isValid && isTouched && !isFiltered;
  let content = (
    <div>
      <h3> Pokémon filter </h3>
      <form onSubmit={typeFilterHandler}>
        <input
          type="text"
          onChange={pokemonInputHandler}
          onBlur={inputBlurHandler}
          placeholder="Enter a Pokémon type"
        ></input>
        <button type="submit">Filter Pokémon types</button>
      </form>
      {isValid === true && isFiltered && (
        <h3>
          {" "}
          Your filtered Pokémon type: <PokemonList pokemons={pokemon} />{" "}
          <hr></hr>
        </h3>
      )}
      {inputIsInvalid && (
        <h4 style={{ color: "red" }}>
          {" "}
          Please enter a Pokémon type to search{" "}
        </h4>
      )}
      {inputIsNotFiltered && (
        <h4 style={{ color: "red" }}>
          {" "}
          The requested Pokémon type couldn't be found, try again!{" "}
        </h4>
      )}
    </div>
  );

  return <div>{content}</div>;
};

export default PokemonTypeFilter;
