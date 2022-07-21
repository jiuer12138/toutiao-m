import storage from '@/utils/strorage'

const HISTORY_KEY = 'TOUTIAO_HISTORY'
export const getHistory = () => storage.get(HISTORY_KEY)
export const setHistory = (history) => storage.set(HISTORY_KEY, history)
export const removeHistory = () => storage.get(HISTORY_KEY)
