import { useState } from 'react';

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState({});

  const toggleShowPassword = (name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return { toggleShowPassword, showPassword };
};

export default usePasswordToggle;
