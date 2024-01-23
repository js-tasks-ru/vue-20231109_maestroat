<template>
  <UiInput :type="type" :step="step" @input="proxy($event)" :modelValue="val">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';
export default {
  name: 'UiInputDate',
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
  computed: {
    val() {
      const format = (date) => (date < 10 ? `0${date}` : date.toString());
      const date = new Date(this.modelValue);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      const h = date.getUTCHours();
      const m = date.getUTCMinutes();
      if (this.type === 'date') {
        return `${year}-${format(month)}-${format(day)}`;
      }
      if (this.type === 'time') {
        return `${format(h)}:${format(m)}`;
      }
      if (this.type === 'datetime-local') {
        return `${year}-${format(month)}-${format(day)}T${format(h)}:${format(m)}`;
      }
      return '';
    },
  },
  methods: {
    proxy(e) {
      this.$emit('update:modelValue', e.target.valueAsNumber);
    },
  },
};
</script>
