<template>
  <div class="dropdown" >
    <button type="button" class="dropdown__toggle" :class="{'dropdown__toggle_icon': optionsIcon}" @click="dropdownOpened ? dropdownOpened = false : dropdownOpened = true" >
      <UiIcon :icon="modelValueIcon" class="dropdown__icon" v-if="modelValueIcon" />
      <span>{{ modelText || title }}</span>
    </button>

    <div class="dropdown__menu" role="listbox" v-show="dropdownOpened" :class="{'dropdown_opened': dropdownOpened}">
      <button class="dropdown__item" :class="{'dropdown__item_icon': optionsIcon}" role="option" type="button" v-for="(el) in options" :key="el.value" @click="handler(el)">
        <UiIcon :icon="el.icon" class="dropdown__icon" v-if="el.icon" />
        <span>{{ el.text }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiDropdown',
  components: { UiIcon },
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
    },
    title: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      dropdownOpened: false,
    }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    modelText() {
      const result = this.options.find(({ value }) => value === this.modelValue);
      return result?.text
    },
    optionsIcon() {
      const even = ({ icon }) => icon;
      return this.options.some(even);
    },
    modelValueIcon() {
      if (this.modelValue) {
        const result = this.options.find(({ value }) => value === this.modelValue);
        return result.icon
      }
      else return ''
    },
  },
  methods: {
    handler(el) {
      this.$emit('update:modelValue', el.value);
      this.dropdownOpened = false;
    },
  },
}

</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__toggle {
  display: inline-block;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 10px 56px 10px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  transition-duration: 0.2s;
  transition-property: background-color, fill, color;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
}

.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('@/assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown_opened .dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown_opened .dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  background-clip: padding-box;
  border-radius: 0 0 8px 8px;
  border: 2px solid var(--blue);
  border-top: none;
  bottom: auto;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: auto;
  top: -1px;
  transform: translate3d(0px, 52px, 0px);
  width: 100%;
  will-change: transform;
  z-index: 95;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
