/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { KEY } from "../App";

import StarRating from "./StarRating";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const {
    Title: title,
    Poster: poster,
    Released: released,
    Plot: plot,
    Actors: actors,
    Director: director,
    Genre: genre,
    Runtime: runtime,
    imdbRating,
  } = movie;

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title} `;
    return () => (document.title = `usePopcorn`);
  }, [title]);

  const isWatched = watched.map((e) => e.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (e) => e.imdbID === selectedId
  )?.userRating;

  function addMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      runtime: parseFloat(runtime),
      userRating: Number(userRating),
      imdbRating: Number(imdbRating),
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  return (
    <>
      {isLoading && <h2 className="loader">Loading...</h2>}
      {!isLoading && (
        <div className="details">
          <header>
            <button
              className="btn-back"
              onClick={() => onCloseMovie(selectedId)}
            >
              ←
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} . {runtime}
              </p>
              <p>{genre}</p>
              <p>IMDB {imdbRating}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>Your rating for this film is {watchedUserRating}</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={25}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addMovie}>
                      {" "}
                      + Add to watched list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>{plot}</p>
            <p>{actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
