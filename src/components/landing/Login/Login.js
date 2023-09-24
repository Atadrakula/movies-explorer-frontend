import React from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';
import './Login.css';

function Login() {
  return (
    <PageWithIdentification
      name="Рады видеть!"
      textSubmit="Войти"
      signatute="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkTo="/sign-up"
      isFormRegistration={false}
    />
  );
}

export default Login;
