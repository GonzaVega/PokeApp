import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map(async (movieData) => {
        const eachResponse = fetch(movieData.url)
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
            const weaknessesSet = [...new Set(weaknesess)];
            const strenghtsSet = [...new Set(strenghts)];
            console.log(
              `${nameCategory} fuerte contra: ${strenghtsSet}---------debil contra: ${weaknessesSet}`
            );
            return {
              name: nameCategory,
              betterTo: strenghtsSet,
              worstTo: weaknessesSet,
            };
          });

        return {
          name: movieData.name,
          strongAgainst: eachResponse.betterTo,
          worstAgainst: eachResponse.worstTo,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>{/* <AddMovie onAddMovie={addMovieHandler} /> */}</section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Pokemon Classes</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
