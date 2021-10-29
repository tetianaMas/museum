class DataBase {
  setToLocalStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export const DB = new DataBase();
