<template>
  <form class="mt-5 login-form">
    <div>
      <input placeholder="Name" type="text" v-model="input.name" />
    </div>
    <div>
      <input placeholder="Username" type="text" v-model="input.username" />
    </div>
    <div>
      <input placeholder="Password" type="password" v-model="input.password" />
    </div>
    <div>
      <LoginButton @click.prevent="login()" />
    </div>
    <div v-show="invalid">
      <p class="text-center text-red-500 uppercase">{{ errMsg }}</p>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";
import LoginButton from './LoginButton.vue';

// Variables réactives pour gérer les champs du formulaire, l'état d'invalidité et le message d'erreur
const input = ref({
  name: "",
  username: "",
  password: "",
});

const invalid = ref(false);
const errMsg = ref("");

// Accède au store Vuex et au router
const $store = useStore();
const $router = useRouter();

// Fonction pour gérer la connexion
const login = () => {
  // Réinitialise l'état d'invalidité et le message d'erreur
  invalid.value = false;
  errMsg.value = "";

  // Vérifie si les champs d'utilisateur et de mot de passe ne sont pas vides
  if (input.value.username === "" || input.value.password === "") {
    // Affiche un message d'erreur si les champs sont vides
    errMsg.value = "Fields cannot be empty";
    invalid.value = true;
    $store.commit(`auth/${SET_AUTHENTICATION}`, false);
  } else {
    // Si les champs ne sont pas vides, récupère les données de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem('user');
    {
      // Si les données de l'utilisateur existent, vérifie si l'utilisateur est enregistré
      const user = JSON.parse(userData);
      if (user.username === input.value.username && user.password === input.value.password) {
        // Connexion réussie, met à jour le message d'erreur pour afficher "Authentication complete"
        errMsg.value = "Authentication complete";
        // Met à jour l'état d'authentification dans le store Vuex
        $store.commit(`auth/${SET_AUTHENTICATION}`, true);
        // Met à jour le nom d'utilisateur dans le store Vuex
        $store.commit(`auth/${SET_USERNAME}`, input.value.username);
        // Redirige vers la page de tableau de bord
        $router.push('/dashboard');
      } else {
        // Nom d'utilisateur ou mot de passe incorrect, met à jour le message d'erreur pour afficher "User not registered"
        errMsg.value = "User not registered.";
        // Définit l'état d'invalidité sur true pour afficher le message d'erreur
        invalid.value = true;
        // Met à jour l'état d'authentification dans le store Vuex pour indiquer une authentification échouée
        $store.commit(`auth/${SET_AUTHENTICATION}`, false);
      }
    }
  }
};

// Utilise une computed property pour accéder à la propriété d'authentification du store Vuex
const isAuthenticated = computed(() => $store.state.auth.authentication);
</script>
