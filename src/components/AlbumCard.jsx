import {useState} from "react";

const AlbumCard = ({album}) => {
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  return (
    <div className="album--card">
      <h2 className="releaseDate">{album.releaseDate}</h2>
      <img onClick={() => setOnlyFavorite(!onlyFavorite)} className="image" src={album.image} alt={album.title}/>
      <div className="album--info">
        <h2 className="title">{album.title}</h2>
        <h4 className="author">{album.author}</h4>
        {album.tracks.map((track, index) => (
          <div
            className={`track--wrapper ${track.favorite || onlyFavorite ? 'track--show' : 'track--hide'}`}
            key={index}
          >
            <p className="track--position">{track.position}</p>
            <div className="track--info">
              <a className="track--title" href={track.url}>{track.title}</a>
              {track.feats.length !== 0 && <p className="feat">ft. {track.feats.join(', ')}</p>}
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default AlbumCard;