import { useEffect, useState } from "react";
import { KEY } from "../App";

export  function useMovies(query) {
    const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

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

    return [movies, isLoading, error]
}
