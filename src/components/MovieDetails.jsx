import { useEffect, useState } from 'react';
import { KEY } from '../App';

import StarRating from './StarRating';

export default function MovieDetails({ selectedId, onCloseMovie }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
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
		async function fetchMovieDetails() {
			try {
				setIsLoading(true);
				const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
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
						<button className="btn-back" onClick={() => onCloseMovie(selectedId)}>
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
						<div className="rating"><StarRating maxRating={10} size={25} /></div>
						<p>{plot}</p>
						<p>{actors}</p>
						<p>Directed by {director}</p>
					</section>
				</div>
			)}
			{/* {error && <h2 className="loader">⛔{error}</h2>} */}
		</>
	);
}
``