<template>
  <div>
    <h1>Welcome {{ username }}</h1> 
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
import { ref } from 'vue';
import { uid } from 'uid';
const uploadList = ref([]);

const $store = useStore();

// Utilisez le nom "username" pour stocker la valeur du nom d'utilisateur
const username = $store.getters[`auth/${GET_USERNAME}`];

// Fonction pour gérer le formulaire soumis
const createPost = ({ imageContent, isImage, selectedFile }) => {
  // Ajoute le fichier sélectionné à la liste des fichiers téléchargés
  uploadList.value.push({
    id: uid(),
    name: selectedFile.name,
    isImage: isImage,
    imageContent: imageContent,
    // Ajoutez d'autres propriétés du fichier ici si nécessaire
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


