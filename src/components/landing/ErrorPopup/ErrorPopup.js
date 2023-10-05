import React, { useEffect, useState } from 'react';
import './ErrorPopup.css';

function ErrorPopup({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [message]);

  return (
    <div className={`error-popup ${visible && 'error-popup_visible'}`}>
      <p className="error-popup__text">⚠ {message}</p>
    </div>
  );
}

export default ErrorPopup;
