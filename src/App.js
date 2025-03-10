import React, { useState, useEffect } from "react";
import { fetchMovies } from "./services/api";
import Movie from "./components/Movie";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(query);
      setMovies(data);
    };
    getMovies();
  }, [query]);

  return (
    <div>
      <header style={{ padding: "10px", background: "#ccc", textAlign: "center" }}>
        <h1>Movie Recommender</h1>
      </header>
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          style={{ padding: "10px", marginBottom: "20px" }}
        />
        <button
          onClick={() => navigate("/favorites")}
          style={{
            padding: "10px",
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          View Favorites
        </button>
        <div>
          {movies?.length > 0 ? (
            movies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
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
