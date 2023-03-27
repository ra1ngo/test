<template>
  <component :is="icon" class="v-icon" :class="{ rotate }" @click.native="$emit('click')"></component>
</template>

<script>
import IconPlus from '@/svg/IconPlus.vue';
import IconExpand from '@/svg/IconExpand.vue';
import IconClose from '@/svg/IconClose.vue';
import IconPlusBordered from '@/svg/IconPlusBordered.vue';
import IconMinusBordered from '@/svg/IconMinusBordered.vue';

export default {
  name: 'VIcon',
  components: {
    IconPlus, IconExpand, IconClose, IconPlusBordered, IconMinusBordered,
  },
  props: {
    rotate: { type: Boolean },
    icon: {
      type: String,
      required: true,
      validator: (v) => ['IconPlus', 'IconExpand', 'IconClose', 'IconPlusBordered', 'IconMinusBordered'].includes(v),
    },
  },
};
</script>

<style lang="scss" scoped>
.v-icon {
  user-select: none;
}
.rotate {
  transform: rotate(180deg);
}
</style>
