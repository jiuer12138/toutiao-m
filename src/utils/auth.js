// Authorizations
import storage from './strorage'

const TOKEN_KEY = 'TOUTIAO-TOKEN'
export const getToken = () => storage.get(TOKEN_KEY)
export const setToken = (token) => storage.set(TOKEN_KEY, token)
export const removeToken = () => storage.get(TOKEN_KEY)
