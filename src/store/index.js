import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import app from './app'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const secureLs = new SecureLS({ isCompression: false })
  const Store = createStore({
    modules: {
      app
    },
    plugins: [
      createPersistedState({
        key: 'rAssess',
        paths: ['appConfig', 'user', 'classRoom', 'app'],
        storage: {
          getItem: (key) => secureLs.get(key),
          setItem: (key, value) => secureLs.set(key, value),
          removeItem: (key) => secureLs.remove(key)
        }
      })
    ],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
