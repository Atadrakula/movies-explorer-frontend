import React from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';

function Login() {
  return (
    <PageWithIdentification
      name="Рады видеть!"
      textSubmit="Войти"
      signatute="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkTo="/signup"
      isFormRegistration={false}
    />
  );
}

export default Login;
