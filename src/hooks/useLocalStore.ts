

export interface UseLocalStore {
  key: string;
  data: {};
}

const useLocalStore = () => {
  return {
    getFromLocalStore({ key }: UseLocalStore) {
      const data = window.localStorage.getItem(key);
      if (data) return JSON.stringify(data);
    },
    setToLocalStore({ key, data }: UseLocalStore) {
      window.localStorage.setItem(key, JSON.stringify(data));
      return true;
    },
  };
};

export default useLocalStore;
