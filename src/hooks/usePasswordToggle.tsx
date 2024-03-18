import { useState } from 'react';

interface IPasswordState {
  [key: string]: boolean;
}

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState<IPasswordState>({}); // 객체로 변경

  const toggleShowPassword = (name: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name], //해당 key값의 true/false만 변경
    }));
  };

  return { toggleShowPassword, showPassword };
};
export default usePasswordToggle;
