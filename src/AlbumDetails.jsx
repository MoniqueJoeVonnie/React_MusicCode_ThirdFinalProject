import { Link, useParams } from "react-router-dom";

function AlbumDetails({ albums }) {
  const { id } = useParams();

  const album = albums.find((item) => item.id === id);
  const recommendedAlbums = albums
  .filter((item) => item.id !== album.id)
  .slice(0, 4);

  if (!album) {
    return <p>Album not found.</p>;
  }

  return (
    <div className="album-details-page">
      <Link to="/" className="back-link">
        ← Albums
      </Link>

      <section className="album-details">
        <img src={album.image} alt={album.title} />

        <div>
          <h1>{album.title}</h1>
          <p>{album.artist}</p>

          <div className="stars">
            {"★".repeat(album.rating)}
          </div>

          <p className="price">${album.salePrice}</p>

          <h3>Summary</h3>

          <p>
            Explore this album from {album.artist}. This project features a
            unique sound, strong musical style, and tracks selected for listeners
            looking for new music inspiration.
          </p>

          <button className="add-cart-btn">
            Add to cart
          </button>
        </div>
      </section>

      <section className="recommended-section">

  <h2>Recommended Albums</h2>

  <div className="recommended-grid">

    {recommendedAlbums.map((item) => (

      <Link
        to={`/album/${item.id}`}
        className="recommended-card"
        key={item.id}
      >

        <img
          src={item.image}
          alt={item.title}
        />

        <h3>{item.title}</h3>

        <p>{item.artist}</p>

        <div className="stars">
          {"★".repeat(item.rating)}
        </div>

        <p className="price">
          ${item.salePrice}
        </p>

      </Link>

    ))}

  </div>

</section>
    </div>
  );
}

export default AlbumDetails;