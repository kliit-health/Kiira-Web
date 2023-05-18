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
          <i className="fa-sharp fa-solid fa-eye" onClick={togglePasswordVisibility}></i>
        ) : (
          <i className="fa-sharp fa-solid fa-eye-slash" onClick={togglePasswordVisibility}></i>
        )
      }
      {...props}
    />
  );
};

export default AppPasswordInput;
