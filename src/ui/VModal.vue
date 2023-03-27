<template>
  <div v-observe-attrs="{ handler: syncState, attributes: ['style'] }">
    <portal to="app-overlay" v-if="isOpen">
      <div class="v-modal-overlay">
        <div class="v-modal" :style="`width: ${width};`" v-out-click="closeModal">
          <div class="v-modal__title">
            <h3 class="v-modal__title-text">{{ title }}</h3>
            <VIcon class="v-modal__title-icon" icon="IconClose" @click="closeModal" />
          </div>
          <div class="v-modal__body">
            <slot />
          </div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import { outClick, observeAttrs } from '@/directives';
import VIcon from './VIcon.vue';

export default {
  name: 'VModal',
  directives: { outClick, observeAttrs },
  components: { VIcon },
  props: {
    title: { type: String, required: true },
    width: { type: String, default: '512px' },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    syncState(el) {
      // setTimeout нужен, чтобы открытие модалки произошло через макротаски
      // иначе клик на кнопку, открывающую модалку, тут же ее закроет в outClick'е
      setTimeout(() => {
        this.isOpen = el.style.display !== 'none';
      }, 0);
    },
    closeModal() {
      this.$emit('close');
    },
    mounted() {
      this.changeOpen(this.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/theme.scss';

.v-modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: rgba(0,0,0,0.8);
  z-index: $z-index-modal;
}
.v-modal {
  position: relative;
  top: 20%;
  height: fit-content;
  border-radius: 5px;
  background: $color-white;
}
.v-modal__title {
  position: relative;
  padding: 24px 32px;
  border-bottom: 1px solid $color-gray-secondary;
}
.v-modal__title-text {
}
.v-modal__title-icon {
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
}
.v-modal__body {
  padding: 32px;
}
</style>
