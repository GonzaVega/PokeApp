import React, { useState, useEffect } from "react";
import App from "../App";
import MoviesList from "../components/MoviesList";
import classes from "./PokemonTypeFilter.module.css";
const PokemonTypeFilter = (props) => {
  const [filtered, setFiltered] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [isValid, setIsValid] = useState(null);
  const [isFiltered, setIsFiltered] = useState(null);
  const [isValue, setIsValue] = useState(null);
  // const [isTouched, setIsTouched] = useState(false);

  const pokemonInputHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    if (event.target.value.trim().length === 0) {
      setIsValue(false);
    }
    setFiltered(event.target.value);
  };

  // const inputBlurHandler = (event) => {
  //   console.log("onBlur fired");
  //   setIsTouched(true);
  // };

  const typeFilterHandler = (event) => {
    event.preventDefault();

    const filteredPokemon = props.pokemonTypes.filter(
      (type) => type.name === filtered.toLowerCase().trim("")
    );

    if (filteredPokemon.length > 0) {
      setIsFiltered(true);
    }
    if (!filteredPokemon) {
      setIsFiltered(false);
    }
    console.log(filteredPokemon);
    return setPokemon(filteredPokemon);
  };

  let content = (
    <div>
      Pokemon filter <p>{`${isValid}, ${isFiltered}`}</p>
      <form onSubmit={typeFilterHandler}>
        <input
          type="text"
          onChange={pokemonInputHandler}
          placeholder="Enter a Pokémon type"
        ></input>
        <button type="submit">Filter Pokémon by type</button>
      </form>
      {isValid === true && isFiltered && (
        <h3>
          {" "}
          Your filtered Pokémon type: <MoviesList movies={pokemon} />{" "}
        </h3>
      )}
      {isValue === false && !isValid && (
        <h4> Please enter a Pokémon type to search </h4>
      )}
      {isFiltered === false && (
        <h4> The requested Pokémon type couldn't be found, try again! </h4>
      )}
    </div>
  );

  // if (isValid === false || isTouched === true) {
  //   content = (
  //     <div>
  //       Pokemon filter
  //       <form onSubmit={typeFilterHandler}>
  //         <input
  //           type="text"
  //           onChange={pokemonInputHandler}
  //           onBlur={inputBlurHandler}
  //         ></input>
  //         <button type="submit">Filter Pokémon by type</button>
  //       </form>
  //       <h4> Please enter a Pokémon type to search </h4>
  //     </div>
  //   );
  // }
  // if (isFiltered === false && isTouched === true) {
  //   content = (
  //     <div>
  //       Pokemon filter
  //       <form onSubmit={typeFilterHandler}>
  //         <input
  //           type="text"
  //           onChange={pokemonInputHandler}
  //           onBlur={inputBlurHandler}
  //         ></input>
  //         <button type="submit">Filter Pokémon by type</button>
  //       </form>
  //       <h4> The requested Pokémon type couldn't be found, try again! </h4>
  //     </div>
  //   );
  // }

  return <div>{content}</div>;
};

export default PokemonTypeFilter;
