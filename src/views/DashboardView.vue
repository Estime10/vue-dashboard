<template>
  <div>
    <h1>Welcome {{ user.name }}</h1>
  </div>
  <div class="container">
    <h1>Create Post</h1>
    <!-- Composant pour le formulaire de création de post -->
    <PostForm @file-selected="createPost" />
    <!-- Liste des posts téléchargés -->
    <ul class="postlist" v-if="uploadList.length > 0">
      <!-- Boucle pour afficher chaque post -->
      <li v-for="(selectedFile, index) in uploadList" :key="selectedFile.id" class="grid-item">
        <!-- Composant pour afficher les détails du post -->
        <PostItem
          :selectedFile="selectedFile"
          :isSelected="selectedFile.isSelected"
          :isDeleted="selectedFile.isDeleted"
          :postId="selectedFile.id"
          :index="index"
          @selected-post="togglePostSelection(index)"
          @delete-post="deletePost(index)"
          class="grid-item"
        />
        <img class="image-container" v-if="selectedFile.isImage" :src="selectedFile.imageContent" :alt="selectedFile.name" />
      </li>
    </ul>
  </div>
</template>

<script setup>
// Importer les dépendances et les composants nécessaires
import { useStore } from 'vuex';
import { GET_USERNAME } from "../store/storeconstants";
import PostForm from '../components/PostForm.vue';
import PostItem from '../components/PostItem.vue';
import { ref, onMounted, watch } from 'vue';
import { uid } from 'uid';
import { Icon } from "@iconify/vue";

// Définition des variables réactives avec la fonction ref()
const uploadList = ref([]);
const user = ref("");
const $store = useStore();

// Mettre à jour le nom d'utilisateur dans le localStorage lorsqu'il change
watch(user, () => {
  localStorage.setItem('user', JSON.stringify(user.value));
}, { deep: true });

// Récupérer le nom d'utilisateur depuis le store Vuex lors du chargement initial de la page
const fetchUser = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user.value = storedUser;
  } else {
    // Si le nom d'utilisateur n'est pas dans le localStorage, on le récupère depuis le store Vuex
    user.value = $store.getters[`auth/${GET_USERNAME}`];
    // Puis on le stocke dans le localStorage pour les prochaines visites
    localStorage.setItem('user', JSON.stringify(user.value));
  }
};
fetchUser();

// Récupérer les posts depuis localStorage lors du chargement initial de la page
const fetchPosts = () => {
  const storedPosts = JSON.parse(localStorage.getItem('posts'));
  if (storedPosts) {
    uploadList.value = storedPosts;
  }
};
fetchPosts();

// Mettre à jour les posts dans le localStorage
watch(uploadList, () => {
  localStorage.setItem('posts', JSON.stringify(uploadList.value));
}, { deep: true });

// Fonction pour gérer le formulaire soumis
const createPost = ({ imageContent, isImage, selectedFile }) => {
  // Ajouter le fichier sélectionné à la liste des fichiers téléchargés
  uploadList.value.push({
    id: uid(),
    name: selectedFile.name,
    isImage: isImage,
    imageContent: imageContent,
    isSelected: false, 
    isDeleted: false, 
  });
};

// Fonction pour gérer la suppression d'un fichier
const deletePost = (index) => {
  // Supprimer le fichier de la liste des fichiers téléchargés
  uploadList.value.splice(index, 1);
};

// Fonction pour basculer la sélection d'un fichier
const togglePostSelection = (index) => {
  uploadList.value[index].isSelected = !uploadList.value[index].isSelected;
};
</script>

<style scoped>

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; 
  width: 200px;
  border: 1rem solid white;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.postlist {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
  margin-top: 2rem;
}
</style>
