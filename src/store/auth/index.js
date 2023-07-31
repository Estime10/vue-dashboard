// Importez les mutations définies dans le fichier 'mutation.js' du même répertoire
import mutations from '../auth/mutation';
// Importez les getters définis dans le fichier 'getters.js' du même répertoire
import getters from '../auth/getters';

export default {
  // Déclarez ce module comme un module namespaced (permet d'éviter les conflits avec d'autres modules)
  namespaced: true,

  // Définit l'état initial du module
  state() {
    return {
      // Indique si l'utilisateur est authentifié ou non. Par défaut, il n'est pas authentifié.
      authenticated: false,
      // Stocke le nom d'utilisateur de l'utilisateur connecté. Par défaut, c'est une chaîne vide.
      username: "",
    };
  },

  // Importez les mutations définies dans le fichier 'mutation.js'
  mutations,
  // Importez les getters définis dans le fichier 'getters.js'
  getters
}
