<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
<header class="text-2xl flex justify-end">
    <nav class="mt-5 uppercase font-bold">
        <ul class="space-x-10">
        <RouterLink to="/">register</RouterLink>
        <RouterLink to="/login">login</RouterLink>                       
        </ul>
    </nav>
</header>
</template>