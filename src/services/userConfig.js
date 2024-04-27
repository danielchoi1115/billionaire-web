const UserConfig = {
  setConfig: (key, value) => localStorage.setItem(key, value),
  getConfig: (key) => localStorage.getItem(key),
  removeConfig: (key) => localStorage.removeItem(key)
}

export default UserConfig
