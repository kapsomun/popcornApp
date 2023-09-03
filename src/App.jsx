import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import { tempWatchedData } from "./data";
import Main from "./components/Main/Main";
import Logo from "./components/Header/Logo";
import Search from "./components/Header/Search";
import NumResults from "./components/Header/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";

import MovieItem from "./components/MovieItem";
import WatchedMovieItem from "./components/WatchedMovieItem";

// http://www.omdbapi.com/?i=tt3896198&apikey=e5e26fd9

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFilms() {
      setIsLoading(true)
      const res = await fetch(
        "http://www.omdbapi.com/?apikey=e5e26fd9&s=interstellar"
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false)
    }
    fetchFilms();
  }, []);

  return (
    <>
      <Header>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Header>

      <Main>
        <Box>
          {isLoading ? (
            <h2 className="title">Loading</h2>
          ) : (
            <MovieList>
              {movies?.map((movie) => (
                <MovieItem key={movie.imdbID} {...movie} />
              ))}
            </MovieList>
          )}
        </Box>
        <Box>
          <>
            <WatchedSummary watched={watched} />
            <MovieList>
              {watched?.map((movie) => (
                <WatchedMovieItem key={movie.imdbID} {...movie} />
              ))}
            </MovieList>
          </>
        </Box>
      </Main>
    </>
  );
}
