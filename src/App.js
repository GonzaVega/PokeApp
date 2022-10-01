import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";

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

            for (let item of abilitiesObject.damage_relations.no_damage_from) {
              strenghts.push(item.name);
            }
            for (let item of abilitiesObject.damage_relations
              .half_damage_from) {
              strenghts.push(item.name);
            }
            for (let item of abilitiesObject.damage_relations
              .double_damage_to) {
              strenghts.push(item.name);
            }
            for (let item of abilitiesObject.damage_relations.no_damage_to) {
              weaknesess.push(item.name);
            }
            for (let item of abilitiesObject.damage_relations.half_damage_to) {
              weaknesess.push(item.name);
            }
            for (let item of abilitiesObject.damage_relations
              .double_damage_from) {
              weaknesess.push(item.name);
            }
            const weaknessesSet = new Intl.ListFormat().format([
              ...new Set(weaknesess),
            ]);
            const strenghtsSet = new Intl.ListFormat().format([
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

  let content = <p>Found no movies.</p>;

  if (categories.length > 0) {
    content = <MoviesList movies={categories} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchCategoriesHandler}>Fetch Pokemon Classes</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
