import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      navbar: false
    }),
    mutations: {
      toggleNavbar(state) {
        state.navbar = !state.navbar
      }
    }
  })
}

export default createStore
