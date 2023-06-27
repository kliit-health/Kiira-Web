import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
