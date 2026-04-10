//This creates encrypted localstorage for your persisted data in localstorage
// else anybody can access your data from localstorage, which is not secure

import secureLocalStorage from "react-secure-storage";

const createNoopStorage = () => {
  return {
    getItem(_key: any): Promise<any> {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any): Promise<any> {
      return Promise.resolve(value);
    },
    removeItem(_key: any): Promise<any> {
      return Promise.resolve();
    },
  };
};

const createLocalStorage = () => {
  return {
    getItem(_key: any): Promise<any> {
      const value = secureLocalStorage.getItem(_key);
      return Promise.resolve(value);
    },
    setItem(_key: any, value: any): Promise<any> {
      secureLocalStorage.setItem(_key, value);
      return Promise.resolve(value);
    },
    removeItem(_key: any): Promise<any> {
      secureLocalStorage.removeItem(_key);
      return Promise.resolve();
    },
  };
};

const storageData =
  typeof window !== "undefined" ? createLocalStorage() : createNoopStorage();

export default storageData;
