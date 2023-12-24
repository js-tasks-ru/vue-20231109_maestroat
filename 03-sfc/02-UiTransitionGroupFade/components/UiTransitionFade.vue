<template>
  <Transition name="fade" mode="out-in">
    <slot />
  </Transition>
</template>

<script>
export default {
  name: 'UiTransitionFade',
};
</script>

<style scoped>
/* _transitions.css */

:deep(.fade-enter-active,
.fade-leave-active) {
  transition: opacity 0.2s ease-in-out;
}

:deep(.fade-enter-from,
.fade-leave-to) {
  opacity: 0;
}
</style>
