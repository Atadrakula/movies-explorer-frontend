import React from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';

function Register() {
  return (
    <PageWithIdentification
      name="Добро пожаловать!"
      textSubmit="Зарегистрироваться"
      signatute="Уже зарегистрированы? "
      linkText="Войти"
      linkTo="/signin"
      isFormRegistration={true}
    />
  );
}

export default Register;
