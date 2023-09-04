import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import { tempWatchedData } from './data';
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

// http://www.omdbapi.com/?i=tt3896198&apikey=e5e26fd9

export const KEY = 'e5e26fd9';

export default function App() {
	const [query, setQuery] = useState('titanic');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		async function fetchFilms() {
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
				if (!res.ok) throw new Error('Something went wrong');

				const data = await res.json();
				if (data.Response === 'False') throw new Error('Movie not found');

				setMovies(data.Search);
			} catch (error) {
				console.log(error.message);
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}

		const queryTimeout = setTimeout(() => fetchFilms(), 1000);

		return () => clearInterval(queryTimeout);
	}, [query]);

	function handleSelectMovie(id) {
		setSelectedId((prev) => (prev === id ? null : id));
	}

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
						<MovieDetails selectedId={selectedId} onCloseMovie={handleSelectMovie} />
					) : (
						<>
							<WatchedSummary watched={watched} />
							<MovieList>
								{watched?.map((movie) => (
									<WatchedMovieItem key={movie.imdbID} {...movie} />
								))}
							</MovieList>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
