import React, { forwardRef, useRef, useState } from 'react';
import { Input } from '@material-tailwind/react';

const AppPasswordInput = forwardRef((props, innerRef) => {
  const ref = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Input
      ref={ref}
      inputRef={innerRef}
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
});

export default AppPasswordInput;
