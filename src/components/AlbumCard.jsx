const AlbumCard = ({album}) => {
  return (
    <div>
      <img className="image" src={album.image} alt={album.title}/>
      <h2 className="title">{album.title}</h2>
      <h4 className="author">{album.author}</h4>
      {album.tracks.map((track, index) => (
        <div className="track--wrapper" key={index}>
          <a className="track--title" href={track.url}>{track.title}</a>
          {track.feats.map((feat, index) => (
            <p className="feat" key={index}>
              {feat}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AlbumCard;