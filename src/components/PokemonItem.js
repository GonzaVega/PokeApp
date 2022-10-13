import React from "react";

import classes from "./PokemonItem.module.css";

const PokemonItem = (props) => {
  function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  let content = (
    <li>
      {" "}
      <h2>Pokémon class: {capitalizeFirstLetter(props.name)}</h2>
      <h3 style={{ color: "#AAFF00" }}>Strong against: {props.strongTo}</h3>
      <h3 style={{ color: "#522719", borderColor: "whitesmoke" }}>
        Weaker against: {props.worstAgainst}
      </h3>
    </li>
  );
  if (!props.strongTo && !props.worstAgainst) {
    content = (
      <li>
        {" "}
        <h2>Pokémon class: {capitalizeFirstLetter(props.name)}</h2>
        <h3 style={{ color: "white" }}>
          {" "}
          No data available, Proffesor Oak is still researching!
        </h3>
      </li>
    );
  }
  return <div className={classes.PokemonItem}>{content} </div>;
};

export default PokemonItem;
