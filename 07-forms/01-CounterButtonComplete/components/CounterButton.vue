<template>
  <button @click="localCount++">
    {{ this.count || localCount }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      localCount: this.count,
    };
  },
  watch: {
    localCount: {
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
  },
};
</script>
