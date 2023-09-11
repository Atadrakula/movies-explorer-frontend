import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <Link to="/main">
      <img src={logo} alt="Логотип" className="logo" id="logo" />
    </Link>
  );
}

export default Logo;
