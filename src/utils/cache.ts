/* eslint-disable @typescript-eslint/no-explicit-any */
enum CacheType {
  LOCAL = "local",
  SESSION = "session",
}

class Cache {
  storage: Storage;
  constructor(type: CacheType = CacheType.LOCAL) {
    this.storage = type === CacheType.LOCAL ? localStorage : sessionStorage;
  }

  setCache(key: string, value: any) {
    console.log("setCache", key, value);
    this.storage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  removeCache(key: string) {
    this.storage.removeItem(key);
  }

  clearCache() {
    this.storage.clear();
  }
}

const localCache = new Cache(CacheType.LOCAL);
const sessionCache = new Cache(CacheType.SESSION);

export { localCache, sessionCache };
