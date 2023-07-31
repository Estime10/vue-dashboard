import { IS_USER_AUTHENTICATED, GET_USERNAME } from "../storeconstants";

export default {
  // Getter pour vérifier si l'utilisateur est authentifié
  [IS_USER_AUTHENTICATED](state) {
    // Retourne l'état de l'authentification depuis le store Vuex
    return state.authenticated;
  },

  // Getter pour obtenir le nom d'utilisateur
  [GET_USERNAME](state) {
    // Retourne le nom d'utilisateur depuis le store Vuex
    return state.username;
  }
}
