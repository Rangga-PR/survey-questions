import { useState } from "react";

const useLocalStorage = (keyName: string, defaultValue: string = "") => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) return JSON.parse(value);
      else return JSON.parse(defaultValue);
    } catch (err) {
      return err;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
