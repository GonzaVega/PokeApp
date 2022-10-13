import React from "react";

import PokemonItem from "./PokemonItem";
import classes from "./PokemonList.module.css";

const PokemonList = (props) => {
  return (
    <ul className={classes["pokemons-list"]}>
      {props.pokemons.map((pokemon, index) => (
        <PokemonItem
          key={index}
          name={pokemon.name}
          strongTo={pokemon.strongAgainst}
          worstAgainst={pokemon.worstAgainst}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
