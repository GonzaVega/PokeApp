import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          name={movie.name}
          strongTo={movie.strongAgainst}
          worstAgainst={movie.worstAgainst}
        />
      ))}
    </ul>
  );
};

export default MovieList;
