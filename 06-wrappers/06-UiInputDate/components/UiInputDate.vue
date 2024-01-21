<template>
  <UiInput :type="type" :step="step" v-bind="$attrs" @input="proxy($event)" :modelValue="val">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';
export default {
  name: 'UiInputDate',
  inheritAttrs: false,

  components: { UiInput },
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: [Number, null],
    },
    step: {
      type: String,
    },
  },
  emits: {
    'update:modelValue': [Number, null],
  },
  data() {
    return {
      val: '',
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler() {
        const format = (date) => (date < 10 ? `0${date}` : date.toString());
        const date = new Date(this.modelValue);
        if (this.type === 'date') {
          const day = date.getUTCDate();
          const month = date.getUTCMonth() + 1;
          const year = date.getUTCFullYear();
          this.val = `${year}-${format(month)}-${format(day)}`;
        }
        if (this.type === 'time') {
          // const h1 = date.getHours();
          const h2 = date.getUTCHours();
          const m = date.getMinutes();
          this.val = `${h2}:${m}`;
        }
        if (this.type === 'datetime-local') {
          const day = date.getUTCDate();
          const month = date.getUTCMonth() + 1;
          const year = date.getUTCFullYear();
          // const h1 = date.getHours();
          const h2 = date.getUTCHours();
          const m = date.getMinutes();
          this.val = `${year}-${format(month)}-${format(day)}T${h2}:${m}`;
        }
      },
    },
  },
  methods: {
    proxy(e) {
      // console.log(e.target.valueAsNumber);
      this.$emit('update:modelValue', e.target.valueAsNumber);
    },
  },
};
</script>
