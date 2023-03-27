<template>
  <button class="v-button" :class="[kind, color]" v-on="$listeners">
    <v-icon v-if="icon" class="v-button__icon" :icon="icon" />
    {{ label }}
  </button>
</template>

<script>
import VIcon from './VIcon.vue';

export default {
  name: 'VButton',
  components: { VIcon },
  props: {
    icon: { type: String },
    label: {
      type: String,
      required: true,
      validator: (v) => v.length <= 80,
    },
    kind: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary'].includes(v),
    },
    color: {
      type: String,
      default: 'default',
      validator: (v) => ['success', 'default'].includes(v),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/theme.scss';

.v-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 48px;
  padding: 0 30px;
  font-size: 16px;
  border-radius: 10px;
  transition: color $transition-time, border-color $transition-time;
  cursor: pointer;
}
.v-button__icon {
  width: 16px;
  height: auto;
  margin: 0 12px 0 -12px;
}

.primary {
  border: 0;

  &.success {
    color: $color-white;
    background: $color-green;
    &:hover {
      background: $color-green-secondary;
    }
  }

  &.default {
    color: $color-white;
    background: $color-blue;
    &:hover {
      background: $color-blue-secondary;
    }
  }
}

.secondary {
}
</style>
