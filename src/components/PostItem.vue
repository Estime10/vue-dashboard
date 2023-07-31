<template>
    <li>
      <!-- Case à cocher pour sélectionner/désélectionner le post -->
      <input
        type="checkbox"
        :checked="isSelected"
        @input="$emit('selected-post', index)"
      />
  
      <!-- Bouton de suppression du post -->
      <div class="delete-post">
        <!-- Icône de la corbeille qui déclenche l'événement de suppression du post au clic -->
        <Icon
          icon="ph:trash"
          color="#f95e5e"
          width="22"
          @click="$emit('delete-post', postId)"
        />
      </div>
    </li>
  </template>
  
  <script setup>
  import { Icon } from "@iconify/vue";
  
  // Récupérer les propriétés passées au composant via les props
  const props = defineProps({
    selectedFile: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  
  // Déclarer les événements émis par le composant
  defineEmits(["selected-post", "delete-post"]);
  </script>
  
  <style scoped>

  
  .delete-post {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    cursor: pointer;
    margin-bottom: 10px;
  }

    .delete-post .icon {
        width: 22px;
        height: 22px;
    }
  .delete-post:hover {
    opacity: 1;
  }
  </style>
  