import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  // console.log(props.movies);
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie, index) => (
        <Movie
          key={index}
          name={movie.name}
          strongTo={movie.strongAgainst}
          worstAgainst={movie.worstAgainst}
        />
      ))}
    </ul>
  );
};

export default MovieList;
