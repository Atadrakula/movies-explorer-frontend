import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileIcon.css';

function ProfileIcon() {
  return (
    <Link to="/profile" className="profile-icon link-hover">
      <span className="profile-icon__name">Аккаунт</span>
      <span className="profile-icon__logo-container"></span>
    </Link>
  );
}

export default ProfileIcon;
