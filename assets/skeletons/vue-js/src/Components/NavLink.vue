<script setup>
// NavLink.vue — Componente reutilizável de navegação Inertia
// Aplica classe .active automaticamente na rota atual

import { Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const page = usePage();
const isActive = computed(() => page.url === props.href);
</script>

<template>
  <Link :href="href" class="nav-link" :class="{ active: isActive }">
    <slot />
  </Link>
</template>

<style scoped>
.nav-link {
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.nav-link:hover {
  color: #e94560;
}

.nav-link.active {
  color: #e94560;
  border-bottom-color: #e94560;
}
</style>
