import albumsData from './data.json';
import AlbumCard from "./components/AlbumCard.jsx";

const App = () => {
  return (
    <div className="wrapper">
      {albumsData.albums.map((album) => (
        <div className="album" key={album.id}>
          <h2 className="releaseDate">{album.releaseDate}</h2>
          <AlbumCard album={album} />
        </div>
      ))}
    </div>
  );
};

export default App;