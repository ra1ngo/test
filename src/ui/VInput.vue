<template>
  <input
    class="v-input"
    :placeholder="placeholder"
    @change="onChange"
  />
</template>

<script>

export default {
  name: 'VInput',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: 'Заполните поле' },
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/theme.scss';

.v-input {
    display: block;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-size: 16px;
    color: $color-black;
    outline: none;
    border: 1px solid $color-gray;
    border-radius: 5px;
    transition: border-color $transition-time;
    box-sizing: border-box;

    &:focus,
    &:hover {
      border-color: $color-blue;
    }

    &::placeholder {
      color: $color-gray-secondary;
    }
}
</style>
