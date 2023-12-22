import { useState } from 'react';

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState({}); // 객체로 변경

  const toggleShowPassword = (name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name], //해당 key값의 true/false만 변경
    }));
  };

  return { toggleShowPassword, showPassword };
};
export default usePasswordToggle;
