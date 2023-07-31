import { createStore } from 'vuex'

// Le module 'auth' contient ses propres états, mutations, actions et getters.
import auth from './auth/index'

// Crée le store Vuex en utilisant la fonction 'createStore'.
export default createStore({
  // L'état global du store Vuex est défini ici.
  state: {
    // Vous pouvez définir des états globaux ici si nécessaire.
  },

  // Les getters permettent d'accéder aux états du store de manière réactive.
  getters: {
    // Vous pouvez définir des getters personnalisés ici si nécessaire.
  },

  // Les mutations permettent de modifier les états du store de manière synchrone.
  mutations: {
  },

  // Les actions permettent d'exécuter des opérations asynchrones et de commettre des mutations.
  actions: {
  },

  // Les modules permettent de regrouper des modules du store.
  modules: {
    // Le module 'auth' contient ses propres états, mutations, actions et getters définis dans le fichier './auth/index'.
    auth
  }
})
