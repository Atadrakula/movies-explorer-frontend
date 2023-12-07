import React from 'react';
import './ChapterTitle.css';

function ChapterTitle({ borderStyle, text }) {
  return (
    <h2 className="chapter-title" style={borderStyle}>
      {text}
    </h2>
  );
}

export default ChapterTitle;
