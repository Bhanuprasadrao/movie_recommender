import React from "react";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const handlePosterClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${movie.Title} added to favorites!`);
    } else {
      alert(`${movie.Title} is already in favorites!`);
    }
  };

  return (
    <div style={{ margin: "10px", display: "inline-block", textAlign: "center" }}>
      <img
        src={movie.Poster}
        alt={movie.Title}
        onClick={handlePosterClick}
        style={{ width: "200px", height: "300px", cursor: "pointer", borderRadius: "10px" }}
      />
      <h3>{movie.Title}</h3>
      
      {/* Button Container */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <button
          onClick={handlePosterClick}
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Details
        </button>

        <button
          onClick={handleAddToFavorites}
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default Movie;
