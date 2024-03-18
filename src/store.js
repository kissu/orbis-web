import { createStore } from 'vuex';

export default createStore({
    state: {
      user: null,
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      clearUser(state) {
        state.user = null;
      }
    },
    actions: {
      setUser({ commit }, user) {
        commit('setUser', user);
      },
      logout({ commit }) {
        commit('clearUser');
        localStorage.removeItem('user');
      }
    },
    getters: {
      getUser(state) {
        return state.user;
      },
    },
  });
  