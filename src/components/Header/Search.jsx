/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
	const inputRef = useRef(null);

	useEffect(() => inputRef.current.focus(), []);
	return (
		<input
			ref={inputRef}
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}
