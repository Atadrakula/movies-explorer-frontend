import { Link } from 'react-router-dom';
import logo from '../../../../images/logo.svg';
import './Logo.css';

function Logo({ isPageWithAuth }) {
  const typePageClass = `logo ${isPageWithAuth ? 'logo__auth' : ''}`;

  return (
    <Link to="/">
      <img src={logo} alt="Логотип" className={typePageClass} id="logo" />
    </Link>
  );
}

export default Logo;
