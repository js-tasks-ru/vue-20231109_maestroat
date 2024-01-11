<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': load }" :style="urlImage">
      <span class="image-uploader__text">{{ text }}</span>
      <input
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        ref="file"
        @change="setImage($event)"
        @click="setRemove($event)"
        :disabled="load"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data() {
    return {
      text: 'Загрузить изображение',
      load: false,
      file: null,
      image: this.preview,
    };
  },
  watch: {
    image: {
      immediate: true,
      handler() {
        if (this.image && this.load === false) {
          this.text = 'Удалить изображение';
        }
        if (!this.image) {
          this.text = 'Загрузить изображение';
        }
      },
    },
    load() {
      if (this.load) {
        this.text = 'Загрузка...';
      } else this.text = 'Удалить изображение';
    },
  },
  computed: {
    urlImage() {
      if (this.image) return `--bg-url: url('${this.image}')`;
      else return null;
    },
  },
  methods: {
    setImage: async function (event) {
      this.file = this.$refs.file.files[0];
      this.select(this.file);
      this.image = URL.createObjectURL(this.file);
      let uploader = this.uploader;
      if (uploader) {
        event.preventDefault();
        this.load = true;
        try {
          let f = await uploader(this.file);
          this.upload(f);
        } catch (err) {
          this.error(err);
          this.image = null;
          this.$refs.file.value = null;
        }
        this.load = false;
      } else this.load = false;
    },
    setRemove: function (event) {
      if (this.image) {
        event.preventDefault();
        this.remove();
        this.$refs.file.value = null;
        this.image = null;
      }
    },
    select(file) {
      this.$emit('select', file);
    },
    upload(response) {
      this.$emit('upload', response);
    },
    error(err) {
      this.$emit('error', err);
    },
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
