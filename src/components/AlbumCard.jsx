import React, {useRef, useState, useEffect} from "react";
import ColorThief from 'colorthief';

const AlbumCard = ({album}) => {
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const albumCardRef = useRef(null);
  const imageRef = useRef(null);
  const [gradient, setGradient] = useState('');
  const [isVisible, setIsVisible] = useState(false);


  const getColorsFromImage = () => {
    const colorThief = new ColorThief();
    if (imageRef.current && imageRef.current.complete) {
      const colors = colorThief.getPalette(imageRef.current, 2);
      const color1 = `rgb(${colors[0].join(',')})`;
      const color2 = `rgb(${colors[1].join(',')})`;
      setGradient(`linear-gradient(135deg, ${color1}, ${color2})`);
    }
  };


  useEffect(() => {
    if (imageRef.current) {
      if (imageRef.current.complete) {
        getColorsFromImage();
      } else {
        imageRef.current.addEventListener('load', getColorsFromImage);
      }
    }
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', getColorsFromImage);
      }
    };
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.08, // 10% карточки должно быть видно
      }
    );

    if (albumCardRef.current) {
      observer.observe(albumCardRef.current); // Наблюдаем за элементом albumCardRef
    }

    return () => {
      if (albumCardRef.current) {
        observer.unobserve(albumCardRef.current); // Чистим наблюдатель при демонтировании
      }
    };
  }, []);


  const handleClick = () => {
    setOnlyFavorite(!onlyFavorite);
    if (albumCardRef.current && !onlyFavorite) {
      albumCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: "start",
      });
    }
  };

  return (
    <div
      className={`album--card ${isVisible ? 'show' : ''}`} // Добавляем класс 'show', когда элемент видим
      ref={albumCardRef}
      style={{background: gradient}}
    >
      <h2 className="releaseDate">{album.releaseDate}</h2>
      <img
        ref={imageRef}
        onClick={handleClick}
        className="image"
        src={album.image}
        alt={album.title}
        crossOrigin="anonymous"
      />
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
