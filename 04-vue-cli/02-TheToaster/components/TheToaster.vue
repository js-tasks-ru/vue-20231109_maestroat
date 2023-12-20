
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
      <UiToast :toastEl="arr[index]" class="toast" v-for="(el, index) in arr" :key="arr[index]" :class="el.class"/>
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
        time: true
      }
      this.arr.push(toast);
      setTimeout(() => {this.arr.shift()}, 5000)
    },
    success(message)  {
      const toast = {
        class: 'toast_success',
        message: message,
        icon:'check-circle',
        time: true
      }
      this.arr.push(toast);
      setTimeout(() => {this.arr.shift()}, 5000)
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

.toast :deep(.toast__icon) {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
