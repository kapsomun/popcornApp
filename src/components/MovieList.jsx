/* eslint-disable react/prop-types */

export default function MovieList({children}) {
  return (
    <ul className="list">
      {children}
    </ul>
  );
}
