/* eslint-disable react/prop-types */

export default function NumResults({ movies = 0 }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
