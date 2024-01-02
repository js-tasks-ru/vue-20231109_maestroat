
<template>
  <div class="toast" :class="$options.toastClass[toast.type]">
  <UiIcon class="toast__icon" :icon="$options.toastIcon[toast.type]" />
  <span>{{ toast.message }}</span>
    <button @click="this.$emit('close')" class="toast__button">X</button>
  </div>
</template>

<script>
  const toastClass = {
    success: 'toast_success',
    error: 'toast_error'
  }
  const toastIcon = {
    success: 'check-circle',
    error: 'alert-circle'
  }
  import UiIcon from './UiIcon.vue';
  export default {
    name: 'UiToast',
    components: { UiIcon },
    props: {
      toast: {
        type: Object,
        required: true
      },
    },
    emits: ['close'],
    toastClass,
    toastIcon,
  }
</script>
<style scoped>
  .toast__icon {
    margin-right: 12px;
  }

  .toast__button {
    margin-left: 12px;
  }

  .toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
  }

  .toast + .toast {
    margin-top: 20px;
  }

  .toast.toast_success {
    color: var(--green);
  }

  .toast.toast_error {
    color: var(--red);
  }
</style>
