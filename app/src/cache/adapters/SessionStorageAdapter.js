import CacheItem from "../item/CacheItem.js";

function SessionStorageAdapter(defaultExpiration = 3600) {
  this.defaultExpiration = defaultExpiration;

  this.setWithExpiry = (key, value, ttl = 3600) => {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl*1000,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  /**
   *
   * @param key
   * @param callback
   * @return Promise
   */
  this.get= (key, callback) => {
    let itemStr = sessionStorage.getItem(key);
    let item = new CacheItem(this.defaultExpiration);

    // if the item doesn't exist, return null
    if (!itemStr) {
      const valueOrPromise = callback(item).then(value => {
        this.setWithExpiry(key, value, item.getTtl());
      });
      if (valueOrPromise instanceof Promise) {
        return valueOrPromise;
      }
      this.setWithExpiry(key, valueOrPromise, item.getTtl());
      return new Promise((resolve) => {
        resolve(valueOrPromise);
      })
    }
    item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry || item.value === undefined) {
      // If the item is expired, create a new item
      item = new CacheItem(this.defaultExpiration);
      const valueOrPromise = callback(item).then(value => {
        this.setWithExpiry(key, value, item.getTtl());
      });
      if (valueOrPromise instanceof Promise) {
        return valueOrPromise;
      }
      this.setWithExpiry(key, valueOrPromise, item.getTtl());
      return new Promise((resolve) => {
        resolve(valueOrPromise);
      })
    }
    return new Promise((resolve) => {
      resolve(item.value);
    })
  }
  this.delete = (key) => {
    sessionStorage.removeItem(key);
  }
}

export default SessionStorageAdapter