
<template>
    <div class="toasts">
      <UiToast :toast="el" v-for="(el, index) in arr" @click="closeToast(index)" />
    </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',
  components: { UiToast },
  data() {
    return {
      arr: [],
    }
  },
  methods: {
    error(message, delay)  {
      const toast = {
        message: message,
        type: 'error',
      }
      this.arr.push(toast);
      setTimeout(() => this.arr.shift(), delay || 5000)
    },
    success(message, delay)  {
      const toast = {
        message: message,
        type: 'success',
      }
      this.arr.push(toast);
      setTimeout(() => this.arr.shift(), delay || 5000)
    },
    closeToast(index) {
      this.arr.splice(index, 1)
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
