<template>
    <div>
      <input type="file" class="mt-5 text-white uppercase"
      @change="handleFileSelected" />
      <Postbutton @click.prevent="uploadFile()" />
      <div v-show="fileState.invalid">
        <p class="text-center text-red-500 uppercase">{{ fileState.errMsg }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";
  import Postbutton from './PostButton.vue';
  
  const $store = useStore();
  const emit = defineEmits(['file-selected']);
  
  const fileState = reactive({
    selectedFile: null,
    imageContent: null,
    invalid: false,
    errMsg: "",
  });
  
  const handleFileSelected = (event) => {
    fileState.selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
  };
  
  const uploadFile = () => {
    fileState.invalid = false;
    if (fileState.selectedFile !== null) {
      // Créer une instance de FileReader
      const reader = new FileReader();
  
      // Définir la fonction de rappel à exécuter lorsque la lecture du fichier est terminée
      reader.onload = () => {
        // reader.result contient le contenu de l'image sous forme de base64
        const imageContent = reader.result;
        console.log(imageContent);
  
        // Déterminer si le fichier sélectionné est une image
        const isImage = fileState.selectedFile.type.startsWith('image/');
  
        // Émettre l'événement personnalisé avec le contenu de l'image et si c'est une image
        emit('file-selected', { imageContent, isImage, selectedFile: fileState.selectedFile });
  
        // Réinitialiser le fichier sélectionné
        fileState.selectedFile = null;
      };
  
      // Lire le contenu du fichier en tant que Data URL (base64)
      reader.readAsDataURL(fileState.selectedFile);

      // Stocker le fichier dans le localStorage
      localStorage.setItem('file-selected', JSON.stringify(fileState.selectedFile));
    } else {
      fileState.invalid = true;
      fileState.errMsg = "Please select a file";
    }
  };
  </script>
  