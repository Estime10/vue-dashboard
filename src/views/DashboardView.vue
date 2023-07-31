<template>
  <div>
    <h1>Welcome {{ user.name }}</h1> 
  </div>
  <div class="container">
    <h1>Create Post</h1>
    <PostForm @file-selected="createPost" />
    <ul class="postlist"
    v-if="uploadList.length > 0">
      <li v-for="selectedFile in uploadList" :key="selectedFile.id" class="grid-item">
        <div>
          <!-- <p class="mb-5 font-bold uppercase truncate">{{ selectedFile.name }}</p>   -->
        </div>
        <img class="image-container" v-if="selectedFile.isImage" :src="selectedFile.imageContent" :alt="selectedFile.name" />
      </li>
    </ul>
  </div>
</template>


<script setup>
import { useStore } from 'vuex';
import { GET_USERNAME } from "../store/storeconstants";
import PostForm from '../components/PostForm.vue';
import { ref, onMounted, watch } from 'vue';
import { uid } from 'uid';
const uploadList = ref([]);
const user = ref("");
const $store = useStore();

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

// Mettre à jour le nom d'utilisateur dans le localStorage lorsqu'il change
watch(user, () => {
  localStorage.setItem('user', JSON.stringify(user.value));
});

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
    // Ajouter d'autres propriétés du fichier ici si nécessaire
  });
};
</script>


<style lang="css">
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

@media (max-width: 768px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>


