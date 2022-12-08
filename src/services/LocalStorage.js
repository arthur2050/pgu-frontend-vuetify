const Storage = {
  has (key) {
    return !!window.localStorage[key];
  },

  set (key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
    return data;
  },

  get (key) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
      return window.localStorage.getItem(key);
    }
  },

  del (key) {
    window.localStorage.removeItem(key);
  },

  clear () {
    window.localStorage.clear();
  },
};

export {Storage};
