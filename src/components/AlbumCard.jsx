import {useRef, useState} from "react";

const AlbumCard = ({album}) => {
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const albumCardRef = useRef(null);

  const handleClick = () => {
    setOnlyFavorite(!onlyFavorite);

    if (albumCardRef.current && !onlyFavorite) {
      albumCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: "start",
      });
    }
  }

  return (
    <div className="album--card" ref={albumCardRef}>
      <h2 className="releaseDate">{album.releaseDate}</h2>
      <img onClick={handleClick} className="image" src={album.image} alt={album.title}/>
      <div className="album--info">
        <h2 className="title">{album.title}</h2>
        <h4 className="author">{album.artist}</h4>
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