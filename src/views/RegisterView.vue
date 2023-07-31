<template>
  <main>
    <div class="flex justify-center ">
      <div class="flex mt-32">
        <div class="border-2 p-10 rounded-md">
          <h1 class="text-5xl mb-5">register</h1>
          <hr>
          <RegisterForm />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import RegisterForm from '../components/RegisterForm.vue';



// Accède au store Vuex et au router
const $store = useStore();
const $router = useRouter();

// Déclare les variables pour gérer le message de sortie et l'état d'invalidité
const output = ref('');
const invalid = ref(false);

// Fonction pour gérer la connexion
const handleRegister = () => {
  // Utilise la fonction register() du composant RegisterForm pour gérer la connexion
  register();

    // Rediriger vers la page de tableau de bord
    $router.push('/login');
  }
</script>

