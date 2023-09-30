import React, { useCallback } from 'react';
import validator from 'validator';
import { validNameRegex, strongPasswordRegex } from '../constants';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const validateField = (name, value) => {
    let validationError = '';
    if (name === 'email') {
      if (!validator.isEmail(value)) {
        validationError =
          'Пожалуйста, введите корректный адрес электронной почты';
      }
    } else if (name === 'name') {
      if (!validNameRegex.test(value)) {
        validationError =
          'Имя может содержать только латиницу, кириллицу, пробел или дефис';
      } else if (value.length < 2) {
        validationError = 'Имя должно содержать минимум 2 символа';
      }
    } else if (name === 'password') {
      if (!strongPasswordRegex.test(value)) {
        validationError =
          'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры, и спецсимволы: !@#$%^&*()-_+=';
      }
    }
    return validationError;
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });

    const validationError = validateField(name, value);

    const updatedErrors = { ...errors, [name]: validationError };
    const updatedValidStatus = Object.values(updatedErrors).every(
      (error) => !error && error.length === 0,
    );

    // Object.values(errors) - это вызов функции, которая возвращает массив значений свойств объекта errors

    setErrors(updatedErrors);
    setIsValid(updatedValidStatus);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },

    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm };
}
