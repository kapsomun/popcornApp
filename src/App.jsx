import { useState } from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Logo from './components/Header/Logo';
import Search from './components/Header/Search';
import NumResults from './components/Header/NumResults';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';

import MovieItem from './components/MovieItem';
import WatchedMovieItem from './components/WatchedMovieItem';
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useKey } from './hooks/useKey';

// http://www.omdbapi.com/?i=tt3896198&apikey=e5e26fd9

export const KEY = 'e5e26fd9';

export default function App() {
	const [query, setQuery] = useState('titanic');
	const [selectedId, setSelectedId] = useState(null);

	const [movies, isLoading, error] = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], 'watched');

	function handleSelectMovie(id) {
		setSelectedId((prev) => (prev === id ? null : id));
	}
	function handleAddWatchedMovie(movie) {
		setWatched((movies) => [...movies, movie]);
	}
	function handleRemoveWatchedMovie(id) {
		setWatched((movies) => movies.filter((e) => e.imdbID !== id));
	}

	useKey('Escape', handleSelectMovie);

	return (
		<>
			<Header>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</Header>

			<Main>
				<Box>
					{isLoading && <h2 className="loader">Loading...</h2>}
					{!error && !isLoading && (
						<MovieList>
							{movies?.map((movie) => (
								<MovieItem key={movie.imdbID} movie={movie} onSelectMovie={handleSelectMovie} />
							))}
						</MovieList>
					)}
					{error && <h2 className="loader">⛔{error}</h2>}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleSelectMovie}
							onAddWatchedMovie={handleAddWatchedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<MovieList>
								{watched?.map((movie) => (
									<WatchedMovieItem
										key={movie.imdbID}
										movie={movie}
										onSelectMovie={handleSelectMovie}
										onCloseMovie={handleSelectMovie}
										onRemoveWatchedMovie={handleRemoveWatchedMovie}
									/>
								))}
							</MovieList>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
