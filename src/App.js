import React, { useState, useEffect } from "react";
import { fetchMovies } from "./services/api";
import Movie from "./components/Movie";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const getMovies = async () => {
        if (query.trim() === "") {
          setMovies([]);
          return;
        }
        setLoading(true);
        const data = await fetchMovies(query);
        setMovies(data || []);
        setLoading(false);
      };
      getMovies();
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      {/* Header */}
      <header
        style={{
          padding: "20px",
          background: "linear-gradient(90deg, #4b79a1, #283e51)",
          color: "#fff",
          textAlign: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2rem", margin: 0 }}>
          Movie Recommender
        </h1>
      </header>
      
      {/* Search & Favorites Button */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          style={{
            padding: "12px",
            width: "100%",
            maxWidth: "450px",
            borderRadius: "25px",
            border: "2px solid #ccc",
            outline: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease-in-out",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
        <button
          onClick={() => navigate("/favorites")}
          style={{
            padding: "12px 20px",
            marginLeft: "10px",
            borderRadius: "25px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          View Favorites
        </button>
      </div>

      {/* Movies Section */}
      <div style={{ padding: "20px" }}>
        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>
            Loading movies...
          </p>
        ) : movies?.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
              padding: "20px",
            }}
          >
            {movies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#777" }}>
            No movies found. Try searching for something else.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: "15px",
          background: "#222",
          textAlign: "center",
          color: "#fff",
          marginTop: "30px",
          fontSize: "0.9rem",
        }}
      >
        <p>&copy; {new Date().getFullYear()} Movie Recommender. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
