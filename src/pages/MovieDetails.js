import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchRecommendedMovies } from "../services/api";
import Movie from "../components/Movie";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [rating, setRating] = useState(
    JSON.parse(localStorage.getItem("ratings"))?.[id] || 0
  );

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);

        if (details?.Genre) {
          const genre = details.Genre.split(",")[0].trim();
          const recommendations = await fetchRecommendedMovies(genre);
          setRecommendedMovies(recommendations);
        }
      } catch (error) {
        console.error("Error fetching movie details or recommendations:", error);
      }
    };
    getMovieDetails();
  }, [id]);

  const handleRating = (newRating) => {
    setRating(newRating);
    const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
    ratings[id] = newRating;
    localStorage.setItem("ratings", JSON.stringify(ratings));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {movieDetails ? (
        <div>
          {/* Movie Details Section */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "30px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Movie Poster */}
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              style={{
                width: "100%",
                maxWidth: "320px",
                borderRadius: "10px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            />

            {/* Movie Details */}
            <div>
              <h1 style={{ marginBottom: "15px", fontSize: "2rem", color: "#333" }}>
                {movieDetails.Title}
              </h1>
              <p>
                <strong>Genre:</strong> {movieDetails.Genre}
              </p>
              <p>
                <strong>Plot:</strong> {movieDetails.Plot}
              </p>
              <p>
                <strong>Released:</strong> {movieDetails.Released}
              </p>
              <p>
                <strong>Director:</strong> {movieDetails.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movieDetails.Actors}
              </p>
              <p>
                <strong>Runtime:</strong> {movieDetails.Runtime}
              </p>
              <p>
                <strong>IMDB Rating:</strong> {movieDetails.imdbRating}
              </p>

              {/* Star Rating */}
              <div style={{ marginTop: "15px" }}>
                <strong>Your Rating:</strong>{" "}
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleRating(index + 1)}
                    style={{
                      cursor: "pointer",
                      color: index < rating ? "#FFD700" : "#ccc",
                      fontSize: "2rem",
                      transition: "color 0.3s ease-in-out",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Movies Section */}
          <h3
            style={{
              marginTop: "40px",
              fontSize: "1.8rem",
              textAlign: "center",
              color: "#333",
            }}
          >
            Recommended Movies
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              padding: "20px",
            }}
          >
            {recommendedMovies.length > 0 ? (
              recommendedMovies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)
            ) : (
              <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#777" }}>
                No recommendations available
              </p>
            )}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
