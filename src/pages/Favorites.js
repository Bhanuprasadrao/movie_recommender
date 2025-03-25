import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Movie removed from favorites!");
  };

  return (
<div style={{ padding: "20px", textAlign: "center" }}>
  <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#333" }}>
    Your Favorites
  </h2>

  {favorites.length > 0 ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      {favorites.map((movie) => (
        <div
          key={movie.imdbID}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.3s ease-in-out",
            textAlign: "center",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {/* Clickable Poster */}
          <img
            src={movie.Poster}
            alt={movie.Title}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "200px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)")
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)")
            }
          />
          <h3 style={{ margin: "10px 0", fontSize: "1.2rem", color: "#333" }}>
            {movie.Title}
          </h3>

          {/* Remove from Favorites Button */}
          <button
            onClick={() => removeFavorite(movie.imdbID)}
            style={{
              padding: "8px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9rem",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p
      style={{
        fontSize: "1.2rem",
        color: "#777",
        marginTop: "20px",
      }}
    >
      You have no favorite movies yet! Start adding some.
    </p>
  )}
</div>

  );
};

export default Favorites;
