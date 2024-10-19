import albumsData from './data.json';
import AlbumCard from "./components/AlbumCard.jsx";

const App = () => {
  return (
    <div className="wrapper">
      {albumsData.albums.map((album) => (
        <div className="album" key={album.id}>
          <AlbumCard album={album}/>
        </div>
      ))}
    </div>
  );
};

export default App;