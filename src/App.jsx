import { useEffect, useRef, useState } from "react";
import splashVideo from "./assets/music-code-splash.mp4";
import Navbar from "./Components/navbar";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import AlbumDetails from "./AlbumDetails";
import logo from "./assets/musiccode-logo.png";
const CLIENT_ID = "1f3613a7";
const BASE_URL = "https://api.jamendo.com/v3.0";

function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const splashVideoRef = useRef(null);
  const splashTimerRef = useRef(null);

  const handleSplashEnded = () => {
  setShowEnterButton(true);

  splashTimerRef.current = setTimeout(() => {
    setShowEnterButton(false);

    if (splashVideoRef.current) {
      splashVideoRef.current.currentTime = 0;
      splashVideoRef.current.play();
    }
  }, 60000);
};

  useEffect(() => {
  if (!showSplash) return;

  // Hide button immediately whenever splash reopens
  setShowEnterButton(false);

  // Clear old timer
  if (splashTimerRef.current) {
    clearTimeout(splashTimerRef.current);
  }

  const video = splashVideoRef.current;

  if (!video) return;

  video.currentTime = 0;

  video.muted = true;
  video.defaultMuted = true;

  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const attemptPlay = async () => {
    try {
      await video.play();
    } catch (err) {
      console.log("Autoplay blocked:", err);
    }
  };

  attemptPlay();

  return () => {
    if (splashTimerRef.current) {
      clearTimeout(splashTimerRef.current);
    }
  };
}, [showSplash]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState(200);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

  async function fetchAlbums() {

    const response = await fetch(
      `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&limit=100&imagesize=300`
    );

    const data = await response.json();

    const formattedAlbums = data.results.map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.artist_name,
      image: album.image,
      salePrice: Math.floor(Math.random() * 100) + 10,
      rating: Math.floor(Math.random() * 5) + 1,

      keywords: [
  album.name,
  album.artist_name,

  "r&b",
  "rnb",
  "workout",
  "party",
  "focus",
  "coding",
  "rock",
  "pop",
  "electronic",
  "dance",
  "house",
  "techno",
  "ambient",
  "acoustic",
  "folk",
  "jazz",
  "blues",
  "classical",
  "instrumental",
  "hip hop",
  "rap",
  "reggae",
  "metal",
  "punk",
  "latin",
  "soul",
  "funk",

  "piano",
  "guitar",
  "drums",
  "bass",
  "violin",
  "synth",

  "happy",
  "sad",
  "relaxing",
  "energetic",
  "chill",
  "cinematic",
  "romantic",
],
    }));

    setAlbums(formattedAlbums);
  }

  fetchAlbums();

}, []);

const handleSearch = async (e) => {
  e.preventDefault();

  try {
    const encodedSearch = encodeURIComponent(searchTerm.trim());

    const response = await fetch(
      `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&limit=100&imagesize=300&namesearch=${encodedSearch}`
    );

    const data = await response.json();

    const mappedAlbums = data.results.map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.artist_name,
      image: album.image,
      salePrice: Math.floor(Math.random() * 70) + 10,
      rating: Math.floor(Math.random() * 5) + 1,
    }));

    setAlbums(mappedAlbums);
  } catch (error) {
    console.error("Search API error:", error);
  }
};


  const sortedAlbums = [...albums]
  .filter((album) => album.salePrice <= priceRange)
  .filter(() => true)

  .sort((a, b) => {
    if (sortBy === "LOW_TO_HIGH") {
      return a.salePrice - b.salePrice;
    }

    if (sortBy === "HIGH_TO_LOW") {
      return b.salePrice - a.salePrice;
    }

    if (sortBy === "RATING") {
      return b.rating - a.rating;
    }

    return 0;
  });


  return (
  <>
    {showSplash ? (
      <section
  className="splash-screen"
  style={{
  width: "100%",
  minHeight: "100dvh",
  display: "block",
}}
>
  <video
  ref={splashVideoRef}
  className="splash-video"
  src={splashVideo}
  autoPlay
  muted
  playsInline
  preload="auto"
  onEnded={handleSplashEnded}
/>

  <div className="splash-overlay">
    {showEnterButton && (
      <button
  className="enter-search"
    onClick={() => {
      setShowSplash(false);
    }}
  >
    <span className="explore-text">Search Now</span>
  </button>
    )}
  </div>
</section>


    ) : (
      <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <main className="main-content">
              <header className="hero">
                <Navbar />

                <div className="hero__content">
                  <h1>Discover Your Sound</h1>

                   <form className="search" onSubmit={handleSearch}>
                    <input
                      placeholder="Search by genre, artist, album, mood, or activity..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button type="submit">♫</button>
                  </form>
                </div>
              </header>

              <section className="controls">
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="LOW_TO_HIGH">Price: Low to High</option>
                  <option value="HIGH_TO_LOW">Price: High to Low</option>
                  <option value="RATING">Rating</option>
                </select>

                <div className="price-filter">
                  <label>Price Range: $10 to ${priceRange}</label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                </div>
              </section>

              <section className="album-grid">
                {sortedAlbums.map((album) => (
                  <Link
                    to={`/album/${album.id}`}
                    className="album-card"
                    key={album.id}
                  >
                    <img src={album.image} alt={album.title} />
                    <h3>{album.title}</h3>
                    <p>{album.artist}</p>
                    <div className="stars">{"★".repeat(album.rating)}</div>
                    <p className="price">${album.salePrice}</p>
                  </Link>
                ))}
              </section>
            </main>

            <footer className="footer">
              <div className="footer__content">
                <img src={logo} alt="MusicCode Logo" className="footer-logo" />
                <div className="footer__links">
                  <a href="#">About</a>
                  <a href="#">Services</a>
                  <a href="#">Contact</a>
                </div>
              </div>
            </footer>
          </div>
        }
      />

      <Route
  path="/album/:id"
  element={
    <div className="app">
      <main className="main-content">
        <header className="hero">
          <Navbar />
        </header>

        <AlbumDetails albums={albums} />
      </main>

      <footer className="footer">
        <div className="footer__content">
          <img
            src={logo}
            alt="MusicCode Logo"
            className="footer-logo"
          />

          <div className="footer__links">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  }
/>
          </Routes>
    )}
  </>
  );
}

export default App;