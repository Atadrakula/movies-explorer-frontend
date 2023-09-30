/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PageWithIdentification from '../common/PageWithIdentification/PageWithIdentification';

import { useFormWithValidation } from '../../../utils/hooks/UseFormWithValidation';
import validator from 'validator';

function Register({ onRegister, authError }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

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
      authError={authError}
    />
  );
}

export default Register;

// function handleChange(e) {
//   const {name, value} = e.target;

//   if (name === "name" && !validNameRegex.test(value)) {
//     return;
//   }
//   setData(prevState => ({...prevState, [name]: value}));
// }
