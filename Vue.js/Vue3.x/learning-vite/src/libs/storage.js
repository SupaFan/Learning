import ms from 'ms'

const MAX_DATE = new Date(8640000000000000).getTime()

function get(key, store) {
  try {
    const dataStr = store.getItem(key)
    if (!dataStr) {
      return null
    }
    const data = JSON.parse(dataStr)
    if (data.expire < new Date().getTime()) {
      remove(key, store)
      return null
    }
    return data.value
  } catch (error) {
    return null
  }
}

function getAndRemove(key, store) {
  const res = get(key, store)
  remove(key, store)
  return res
}

function set(key, value, expire = null, store) {
  if (expire === null || typeof expire === 'undefined') {
    expire = MAX_DATE
  } else if (expire.constructor === Date) {
    expire = expire.getTime()
  } else {
    if (expire.constructor === Number) {
      expire = new Date().getTime() + expire
    } else if (expire.constructor === String) {
      expire = new Date().getTime() + ms(expire)
    }
  }
  const v = {
    expire: expire,
    value: value
  }
  store.setItem(key, JSON.stringify(v))
}

function remove(key, store) {
  return store.removeItem(key)
}

const storage = {
  getSession(key) {
    return get(key, sessionStorage)
  },
  getSessionRemove(key) {
    return getAndRemove(key, sessionStorage)
  },
  setSession(key, value, expire) {
    return set(key, value, expire, sessionStorage)
  },
  removeSession(key) {
    return remove(key, sessionStorage)
  },
  getLocal(key) {
    return get(key, localStorage)
  },
  getLocalRemove(key) {
    return getAndRemove(key, localStorage)
  },
  setLocal(key, value, expire) {
    return set(key, value, expire, localStorage)
  },
  removeLocal(key) {
    return remove(key, localStorage)
  },
  get(key) {
    return get(key, localStorage)
  },
  set(key, value, expire) {
    return set(key, value, expire, localStorage)
  },
  remove(key) {
    return remove(key, localStorage)
  }
}

export default storage
