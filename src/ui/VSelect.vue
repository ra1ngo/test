<template>
  <div class="v-select" @click="toggleDropdown" v-out-click="closeDropdown">
    <!-- Инпут -->
    <button class="v-select__clear" @click.stop.prevent="clearValue">
      <v-icon class="v-select__clear-icon" icon="IconClose" />
    </button>
    <v-icon class="v-select__icon-expand" icon="IconExpand" :rotate="!isOpen" />
    <input :value="inputValue" class="v-select__input" :placeholder="placeholder" role="button" readonly />

    <!-- Options -->
    <div class="v-select__options" v-show="isOpen" :style="{ maxHeight: maxHeightMenu }">
      <div class="v-select__options-content" v-if="isOpen && visibleOptions.length">
        <div v-for="option in visibleOptions" :key="option.id">
          <div class="v-select__options-item" @click="selectItem(option.id)">
            {{ option.text }}
          </div>
        </div>
      </div>
      <div class="v-select__options-empty" v-else>Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import { isArrayContainsObjectsWithFields } from '@/helpers/validation';
import { outClick } from '@/directives';
import VIcon from './VIcon.vue';

export default {
  name: 'VSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  directives: { outClick },
  components: { VIcon },
  props: {
    value: { type: Number },
    placeholder: { type: String, default: 'Выбрать из списка' },
    maxHeightMenu: { type: String, default: '300px' },
    options: {
      type: Array,
      required: true,
      validator: isArrayContainsObjectsWithFields('id', 'text'),
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectItem(optionId) {
      this.$emit('change', optionId);
    },
    clearValue() {
      this.$emit('change', null);
    },
  },
  computed: {
    visibleOptions() {
      return this.options.filter((o) => o.id !== this.value);
    },
    inputValue() {
      return this.options.find((o) => o.id === this.value)?.text ?? '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/mixins.scss';
@import '@/sass/theme.scss';

.v-select {
  position: relative;
  height: fit-content;
  width: 100%;
}

.v-select__input {
  display: block;
  padding: 0 16px;
  width: 100%;
  font-size: 16px;
  color: $color-black;
  outline: none;
  font-family: inherit;
  border-radius: 5px;
  transition: border-color $transition-time;
  box-sizing: border-box;
  cursor: pointer;
  caret-color: transparent;
  height: 48px;
  border: 1px solid $color-gray;

  &:-moz-placeholder {
    opacity: 1;
    color: $color-gray-secondary;
  }

  &::-ms-input-placeholder {
    opacity: 1;
    color: $color-gray-secondary;
  }

  &::-webkit-input-placeholder {
    opacity: 1;
    color: $color-gray-secondary;
  }
}

.v-select__clear {
  position: absolute;
  right: 28px;
  height: 100%;
  margin: 0 11px 0 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
}

.v-select__clear-icon {
  width: 24px;
  height: auto;
  color: $color-red;
  &:hover {
    color: $color-red-secondary;
  }
}

.v-select__icon-expand {
  position: absolute;
  right: 0;
  height: 100%;
  color: $color-gray-secondary;
  margin: 0 11px 0 0;
  cursor: pointer;
  background: transparent;
}

.v-select__options {
  display: flex;
  position: absolute;
  padding: 4px 16px;
  width: 100%;
  background-color: $color-white;
  border-radius: 5px;
  border: 1px solid $color-gray;
  box-shadow: $shadow;
  box-sizing: border-box;
  z-index: $z-index-menu;

  @include dropdown-triangle($color-gray, $color-white);
}

.v-select__options-empty {
  overflow: hidden;
  width: 100%;
  margin: 10px 0;
}

.v-select__options-content {
  @include scrollbar-container;
}

.v-select__options-item {
  color: $color-black;
  padding: 12px 0;
  text-decoration: none;
  display: block;
  font-size: 16px;
  text-align: start;
  cursor: pointer;

  &:hover {
    color: $color-blue;
  }
}
</style>
