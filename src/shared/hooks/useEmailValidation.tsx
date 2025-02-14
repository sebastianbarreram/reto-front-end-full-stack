import { useState } from 'react';

export const useEmailValidation = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const validateEmailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!validateEmailRegex.test(email)) {
      setErrorMessage('Invalid email format');
    } else {
      setErrorMessage('');
    }
  };

  return { errorMessage, setErrorMessage, validateEmail };
};
