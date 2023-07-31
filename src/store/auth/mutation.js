// Import the necessary constants from 'storeconstants.js'
import {
    SET_AUTHENTICATION,
    SET_USERNAME,
    SET_TOKEN, // Ajoutez cette ligne pour importer la constante SET_TOKEN
    SET_POST // Add other constants here if needed
  } from "../storeconstants";
  
  export default {
    // Mutation to set the 'authenticated' state indicating if the user is authenticated or not.
    // This mutation takes the 'state' as a parameter and the new value 'authenticated'.
    [SET_AUTHENTICATION](state, authenticated) {
      state.authenticated = authenticated;
    },
    // Mutation to set the token.
    // This mutation takes the 'state' as a parameter and the new token 'token'.
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    // Mutation to set the 'username' state storing the username of the logged-in user.
    // This mutation takes the 'state' as a parameter and the new username 'username'.
    [SET_USERNAME](state, username) {
      state.username = username;
    },
    // Add other mutations here if needed
    [SET_POST](state, file) {
      // Handle setting the file post in the state
    },
  };
  