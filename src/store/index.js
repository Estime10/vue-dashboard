import { createStore } from 'vuex';
import auth from './auth/index';

export default createStore({
  state: {
    // Vous pouvez définir des états globaux ici si nécessaire.
    token: null, // Initialisez le token à null ou à une valeur par défaut si nécessaire.
  },

  getters: {
    // Vous pouvez définir des getters personnalisés ici si nécessaire.
    getToken(state) {
      return state.token;
    },
  },

  mutations: {
    // Mutation pour définir le token global.
    setToken(state, token) {
      state.token = token;
    },
  },

  actions: {
    // Vous pouvez définir des actions globales ici si nécessaire.
  },

  modules: {
    // Le module 'auth' contient ses propres états, mutations, actions et getters définis dans le fichier './auth/index'.
    auth
  }
});
