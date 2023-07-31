<template>
  <form class="mt-5 regiter-form">
    <div>
      <input placeholder="Name" type="text" v-model="input.name" />
    </div>

    <div>
      <input placeholder="Username" type="text" v-model="input.username" />
    </div>

    <div>
      <input placeholder="Email" type="text" v-model="input.email" />
    </div>
    <div>
      <input placeholder="Password" type="password" v-model="input.password" />
    </div>
    <div>
      <RegisterButton @click.prevent="register()" />
    </div>
    <div v-show="invalid">
      <p class="text-center text-red-500 uppercase">missing credentials.</p>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";
import RegisterButton from './RegisterButton.vue';

// Déclare les variables pour gérer les champs du formulaire
const input = ref({
  name: "",
  username: "",
  email: "",
  password: "",
});

// Déclare les variables pour gérer le message de sortie et l'état d'invalidité
const output = ref("");
const invalid = ref(false);

// Accède au store Vuex et au router
const $store = useStore();
const $router = useRouter();

// Fonction pour gérer l'inscription
const register = () => {
  // Réinitialise l'état d'invalidité
  invalid.value = false;

  // Vérifie si les champs d'utilisateur, mot de passe, email et nom ne sont pas vides
  if (
    input.value.username !== "" &&
    input.value.password !== "" &&
    input.value.email !== "" &&
    input.value.name !== ""
  ) {
    // Enregistre le message de sortie "Authentication complete"
    output.value = "Authentication complete";

    // Met à jour l'état d'authentification dans le store Vuex pour indiquer une authentification réussie
    $store.commit(`auth/${SET_AUTHENTICATION}`, true);
    // Met à jour le nom d'utilisateur dans le store Vuex
    $store.commit(`auth/${SET_USERNAME}`, input.value.username);

    // Enregistre les données utilisateur dans le localStorage
    const user = {
      name: input.value.name,
      username: input.value.username,
      email: input.value.email,
      password: input.value.password,
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Redirige l'utilisateur vers la page d'accueil
    $router.push('/login');
  } else {
    // Si les champs sont vides, met à jour le message de sortie pour indiquer une erreur
    output.value = "Authentication failed";
    // Met à jour l'état d'authentification dans le store Vuex pour indiquer une authentification échouée
    $store.commit(`auth/${SET_AUTHENTICATION}`, false);
    // Réinitialise le nom d'utilisateur dans le store Vuex
    $store.commit(`auth/${SET_USERNAME}`, "");
    // Définit l'état d'invalidité sur true pour afficher le message d'erreur
    invalid.value = true;
  }
};

</script>
