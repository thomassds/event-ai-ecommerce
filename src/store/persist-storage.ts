import * as reduxPersist from "redux-persist/lib/storage";

type PersistStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: unknown) => Promise<unknown>;
  removeItem: (key: string) => Promise<void>;
};

function createNoopStorage(): PersistStorage {
  return {
    getItem: async () => null,
    setItem: async (_key, value) => value,
    removeItem: async () => undefined,
  };
}

const createWebStorage = (): PersistStorage => ({
  getItem: async (key: string) => {
    return reduxPersist.default.getItem(key);
  },
  setItem: async (key: string, value: unknown) => {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await reduxPersist.default.setItem(key, stringValue);
    return value;
  },
  removeItem: async (key: string) => {
    await reduxPersist.default.removeItem(key);
  },
});

const storage: PersistStorage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage();

export default storage;
