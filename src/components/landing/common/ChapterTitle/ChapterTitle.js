import React, { useEffect, useState } from 'react';
import './ChapterTitle.css';

function ChapterTitle({ borderColor, text }) {
  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    const updateBorderStyle = () => {
      if (window.innerWidth <= 600) {
        setBorderStyle({
          borderBottom: `1px solid ${borderColor || '#DADADA'}`,
        });
      } else {
        setBorderStyle({});
      }
    };

    // Вызываем функцию обновления стиля при монтировании компонента
    updateBorderStyle();

    // Добавляем слушателя события изменения размера окна
    window.addEventListener('resize', updateBorderStyle);

    // Убираем слушателя события при размонтировании компонента, зависящий от изменения borderColor
    return () => {
      window.removeEventListener('resize', updateBorderStyle);
    };
  }, [borderColor]);

  return (
    <h2 className="chapter-title" style={borderStyle}>
      {text}
    </h2>
  );
}

export default ChapterTitle;
