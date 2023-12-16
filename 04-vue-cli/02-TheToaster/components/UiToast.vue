<template>
  <UiIcon class="toast__icon" :icon="toastEl.toastIcon" v-show="toastEl.toastTime"/>
  <span>{{ toastEl.toastMessage }}</span>
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

<style>
  .toast__icon {
    margin-right: 12px;
  }
</style>
