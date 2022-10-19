import React, { useState, useEffect, useCallback } from "react";

import PokemonList from "./components/PokemonList";
import PokemonTypeFilter from "./components/PokemonTypeFilter";

import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoriesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedCategories = data.results.map(async (pokemonData) => {
        const eachResponse = await fetch(pokemonData.url)
          .then((response) => {
            return response.json();
          })
          .then((abilitiesObject) => {
            let weaknesess = [];
            let strenghts = [];
            let nameCategory = abilitiesObject.name;

            const orgCategories = (origin, destination) => {
              for (let item of origin) {
                destination.push(item.name);
              }
            };

            orgCategories(
              abilitiesObject.damage_relations.no_damage_from,
              strenghts
            );
            orgCategories(
              abilitiesObject.damage_relations.half_damage_from,
              strenghts
            );
            orgCategories(
              abilitiesObject.damage_relations.double_damage_to,
              strenghts
            );
            orgCategories(
              abilitiesObject.damage_relations.no_damage_to,
              weaknesess
            );
            orgCategories(
              abilitiesObject.damage_relations.half_damage_to,
              weaknesess
            );
            orgCategories(
              abilitiesObject.damage_relations.double_damage_from,
              weaknesess
            );

            const weaknessesSet = new Intl.ListFormat("en").format([
              ...new Set(weaknesess),
            ]);
            const strenghtsSet = new Intl.ListFormat("en").format([
              ...new Set(strenghts),
            ]);

            return {
              name: nameCategory,
              strongAgainst: strenghtsSet,
              worstAgainst: weaknessesSet,
            };
          });

        setCategories((prevArray) => [...prevArray, eachResponse]);
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  let content = <h3>Found no Pokémon classes.</h3>;

  if (categories.length > 0) {
    content = (
      <div>
        {" "}
        <h3> Pokémon Types </h3>
        <PokemonList pokemons={categories} />{" "}
      </div>
    );
  }

  if (error) {
    content = <h3>{error}</h3>;
  }

  if (isLoading) {
    content = <h3>Loading...</h3>;
  }

  return (
    <React.Fragment>
      <div>
        <img
          src="https://i.pinimg.com/originals/9e/39/23/9e3923825ba4a4fa967858f980b8460f.png"
          alt="Pokemon logo"
        />
      </div>

      <section>
        <button onClick={fetchCategoriesHandler}>Fetch Pokemon Classes</button>
      </section>
      <section>
        <PokemonTypeFilter pokemonTypes={categories} />
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
