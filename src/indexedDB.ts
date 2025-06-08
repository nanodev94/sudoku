import type { Game } from './stores/history.store'

const DB_NAME = 'sudoku'
const DB_OBJET_STORE = 'GAMES'

let request: IDBOpenDBRequest
let db: IDBDatabase
let version = 1

export const initDB = (): Promise<boolean> => {
  return new Promise(resolve => {
    // open the connection
    request = indexedDB.open(DB_NAME)

    request.onupgradeneeded = () => {
      db = request.result

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(DB_OBJET_STORE)) {
        console.log(`Creating ${DB_OBJET_STORE} store`)
        db.createObjectStore(DB_OBJET_STORE, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => {
      db = request.result
      version = db.version
      console.log('request.onsuccess - initDB', version)
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
    }
  })
}

export const addGame = (game: Game): Promise<Game | string | null> => {
  return new Promise(resolve => {
    request = indexedDB.open(DB_NAME)

    request.onsuccess = () => {
      // db = request.result
      const tx = db.transaction(DB_OBJET_STORE, 'readwrite')
      const store = tx.objectStore(DB_OBJET_STORE)
      store.add(game)
      console.log('request.onsuccess - addData', game)
      resolve(game)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const updateGame = (game: Game): Promise<Game | string | null> => {
  return new Promise(resolve => {
    request = indexedDB.open(DB_NAME)

    request.onsuccess = () => {
      // db = request.result
      const tx = db.transaction(DB_OBJET_STORE, 'readwrite')
      const store = tx.objectStore(DB_OBJET_STORE)
      store.put(game)
      console.log('request.onsuccess - updateData', game)
      resolve(game)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const getGamesData = (): Promise<Game[]> => {
  return new Promise(resolve => {
    request = indexedDB.open(DB_NAME)
    request.onsuccess = () => {
      db = request.result
      const tx = db.transaction(DB_OBJET_STORE, 'readonly')
      const store = tx.objectStore(DB_OBJET_STORE)
      const res = store.getAll()
      console.log('request.onsuccess - getAllData')
      res.onsuccess = () => {
        resolve(res.result)
      }
    }
  })
}

export const deleteData = (key: string): Promise<boolean> => {
  return new Promise(resolve => {
    request = indexedDB.open(DB_NAME, version)

    request.onsuccess = () => {
      console.log('request.onsuccess - deleteData', key)
      db = request.result
      const tx = db.transaction(DB_OBJET_STORE, 'readwrite')
      const store = tx.objectStore(DB_OBJET_STORE)
      const res = store.delete(key)

      res.onsuccess = () => {
        resolve(true)
      }
      res.onerror = () => {
        resolve(false)
      }
    }
  })
}
