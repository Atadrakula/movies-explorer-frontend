import React from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';
import { useFormWithValidation } from '../../../utils/hooks/UseFormWithValidation';

function Login({ onLogin, authError }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  async function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onLogin(values);
    }
  }

  return (
    <PageWithIdentification
      title="Рады видеть!"
      textSubmit="Войти"
      signatute="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkTo="/signup"
      isFormRegistration={false}
      onSubmit={handleSubmit}
      onChange={handleChange}
      textError={errors}
      isValid={isValid}
      authError={authError}
    />
  );
}

export default Login;
