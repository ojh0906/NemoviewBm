const ID_TOKEN_KEY = "id_token"
const ID_REMEMBER_KEY = "id_remember"

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

export const getRemember = () => {
  return window.localStorage.getItem(ID_REMEMBER_KEY)
}

export const saveRemember = token => {
  window.localStorage.setItem(ID_REMEMBER_KEY, token)
}

export const destroyRemember = () => {
  window.localStorage.removeItem(ID_REMEMBER_KEY)
}

export default {
  getToken,
  saveToken,
  destroyToken,
  getRemember,
  saveRemember,
  destroyRemember,
}