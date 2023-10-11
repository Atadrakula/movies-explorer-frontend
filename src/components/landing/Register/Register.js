import React from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';

import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';

function Register({ onRegister, authTextError }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  }

  return (
    <PageWithIdentification
      title="Добро пожаловать!"
      textSubmit="Зарегистрироваться"
      signatute="Уже зарегистрированы? "
      linkText="Войти"
      linkTo="/signin"
      isFormRegistration={true}
      onSubmit={handleSubmit}
      onChange={handleChange}
      textError={errors}
      isValid={isValid}
      authTextError={authTextError}
      resetForm={resetForm}
    />
  );
}

export default Register;
