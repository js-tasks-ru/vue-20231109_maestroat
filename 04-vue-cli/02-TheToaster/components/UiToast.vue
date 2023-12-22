<template>
  <div>
  <UiIcon class="toast__icon" :icon="toastEl.icon" />
  <span>{{ toastEl.message }}</span>
  </div>
</template>

<script>
  import UiIcon from './UiIcon.vue';
  export default {
    name: 'UiToast',
    components: { UiIcon },
    props: {
      toastEl: {
        type: Object,
        required: true
      },
    },
  }
</script>
<style scoped>
  .toast__icon {
    margin-right: 12px;
  }
</style>
