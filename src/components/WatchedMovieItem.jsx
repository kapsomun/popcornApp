/* eslint-disable react/prop-types */

export default function WatchedMovieItem({
  movie,
  onRemoveWatchedMovie,
  onSelectMovie,
  onCloseMovie,
}) {
  function deleteMovie(e) {
    e.stopPropagation()
    onCloseMovie();
    onRemoveWatchedMovie(movie.imdbID);
  }

  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
        <button className="btn-delete" onClick={deleteMovie}>❌</button>
      </div>
    </li>
  );
}
