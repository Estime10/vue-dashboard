// Importe les constantes SET_AUTHENTICATION et SET_USERNAME définies dans le fichier 'storeconstants.js'
import {
    SET_AUTHENTICATION,
    SET_USERNAME
  } from "../storeconstants";
  
  export default {
    // Mutation pour définir l'état 'authenticated' qui indique si l'utilisateur est authentifié ou non.
    // Cette mutation prend en paramètre l'état 'state' et la nouvelle valeur 'authenticated'.
    [SET_AUTHENTICATION](state, authenticated) {
      state.authenticated = authenticated;
    },
  
    // Mutation pour définir l'état 'username' qui stocke le nom d'utilisateur de l'utilisateur connecté.
    // Cette mutation prend en paramètre l'état 'state' et le nouveau nom d'utilisateur 'username'.
    [SET_USERNAME](state, username) {
      state.username = username;
    },
  };
  