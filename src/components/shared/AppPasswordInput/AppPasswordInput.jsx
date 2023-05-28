import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';

const AppPasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Input
      autoComplete="off"
      type={showPassword ? 'text' : 'password'}
      icon={
        showPassword ? (
          <i
            className="fa-sharp fa-solid fa-eye font-bold text-kiiraDark"
            onClick={togglePasswordVisibility}></i>
        ) : (
          <i
            className="fa-sharp fa-solid fa-eye-slash font-bold text-kiiraDark"
            onClick={togglePasswordVisibility}></i>
        )
      }
      {...props}
    />
  );
};

export default AppPasswordInput;
