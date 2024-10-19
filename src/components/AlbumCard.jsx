import React, { useRef, useState, useEffect } from "react";
import ColorThief from 'colorthief';

const AlbumCard = ({ album }) => {
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const albumCardRef = useRef(null);
  const imageRef = useRef(null);
  const [gradient, setGradient] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Функция для получения цвета изображения
  const getColorsFromImage = () => {
    const colorThief = new ColorThief();
    if (imageRef.current && imageRef.current.complete) {
      const colors = colorThief.getPalette(imageRef.current, 2); // Получаем 2 доминирующих цвета
      const color1 = `rgb(${colors[0].join(',')})`; // Первый цвет
      const color2 = `rgb(${colors[1].join(',')})`; // Второй цвет
      setGradient(`linear-gradient(135deg, ${color1}, ${color2})`);
    }
  };

  // useEffect для получения цветов после загрузки изображения
  useEffect(() => {
    if (imageRef.current) {
      if (imageRef.current.complete) {
        getColorsFromImage(); // Если изображение уже загружено
      } else {
        imageRef.current.addEventListener('load', getColorsFromImage); // Если изображение загружается
      }
    }
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', getColorsFromImage); // Чистим обработчик при демонтировании
      }
    };
  }, []);

  // useEffect для отслеживания появления карточки в зоне видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Устанавливаем видимость
            observer.disconnect(); // Отключаем наблюдатель, как только элемент виден
          }
        });
      },
      {
        threshold: 0.1, // 10% карточки должно быть видно
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

  // Обработчик клика для переключения favorite и прокрутки
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
      style={{ background: gradient }}
    >
      <h2 className="releaseDate">{album.releaseDate}</h2>
      <img
        ref={imageRef}
        onClick={handleClick}
        className="image"
        src={album.image}
        alt={album.title}
        crossOrigin="anonymous" // Важно для получения цветов с изображений из внешних источников
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
