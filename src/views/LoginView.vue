<template>
  <main>
    <div class="flex justify-center ">
      <div class="flex mt-32">
        <div class="border-2 p-10 rounded-md">
          <h1 class="text-5xl mb-5">Login</h1>
          <hr>
          <LoginForm />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';

// Accède au store Vuex et au router
const $store = useStore();
const $router = useRouter();

// Déclare les variables pour gérer le message de sortie et l'état d'invalidité
const output = ref('');
const invalid = ref(false);

// Fonction pour gérer la connexion
const handleLogin = () => {
  // Utilise la fonction login() du composant LoginForm pour gérer la connexion
  login();

    // Rediriger vers la page de tableau de bord
    $router.push('/dashboard');
  }
</script>

