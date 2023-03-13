import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useToken = () => {
  const [exist, setExist] = useState(false);
  const [value, setValue] = useState(null);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@ACCESS_TOKEN');

      if (!token) return;

      setExist(true);
      setValue(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const storeToken = async (tokenToStore) => {
    try {
      if (!tokenToStore) return;

      await AsyncStorage.setItem('@ACCESS_TOKEN', tokenToStore);
      setExist(true);
      setValue(tokenToStore);
    } catch (error) {
      setExist(false);
      setValue(null);
      console.error(error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@ACCESS_TOKEN');
      setExist(false);
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  const storage = {
    exist,
    value,
    getToken,
    storeToken,
    removeToken,
  };

  return storage;
};
