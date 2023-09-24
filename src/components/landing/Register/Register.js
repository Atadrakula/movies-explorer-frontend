import React from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';
import './Register.css';

function Register() {
  return (
    <PageWithIdentification
      name="Добро пожаловать!"
      textSubmit="Зарегистрироваться"
      signatute="Уже зарегистрированы? "
      linkText="Войти"
      linkTo="/sign-in"
      isFormRegistration={true}
    />
  );
}

export default Register;
