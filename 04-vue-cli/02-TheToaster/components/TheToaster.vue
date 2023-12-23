
<!--  <div class="toasts">-->
<!--    <div class="toast toast_success">-->
<!--      <UiIcon class="toast__icon" icon="check-circle" />-->
<!--      <span>Success Toast Example</span>-->
<!--    </div>-->

<!--    <div class="toast toast_error">-->
<!--      <UiIcon class="toast__icon" icon="alert-circle" />-->
<!--      <span>Error Toast Example</span>-->
<!--    </div>-->
<!--  </div>-->

<template>
    <div class="toasts">
      <UiToast :toast="arr[index]" v-for="(el, index) in arr" :key="arr[index]" :class="el.class" @click="(e) => closeToast(e)"/>
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
    error(message)  {
      const toast = {
        class: 'toast_error',
        message: message,
        icon:'alert-circle',
      }
      this.arr.push(toast);
      setTimeout(() => this.arr.shift(), message?.delay || 5000)
    },
    success(message)  {
      const toast = {
        class: 'toast_success',
        message: message,
        icon:'check-circle',
      }
      this.arr.push(toast);
      setTimeout(() => this.arr.shift(), message?.delay || 5000)
    },
    closeToast(check) {
      check && this.arr.shift()
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
