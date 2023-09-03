import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <>
//       <StarRating color="green" onSetRating={setMovieRating} />
//       <div>movie rating is {movieRating}</div>
//     </>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Perfect"]}
      defaultRating={0}
    />
    <StarRating maxRating={10} size={24} color={"red"} className="test" />

    <Test /> */}
    <App />
  </React.StrictMode>
);
