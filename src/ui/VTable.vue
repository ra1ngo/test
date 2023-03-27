<template>
  <div class="v-table">
    <div class="v-table__headers">
      <div class="v-table__header" v-for="(header, id) in headers" :key="id">
        {{ header.label }}
        <v-icon
          class="v-table__header__icon-sort"
          icon="IconExpand"
          :rotate="sorts[header.name] === 'ASC'"
          @click="sort(header.name)"
        />
      </div>
    </div>
    <div class="v-table__rows">
      <v-table-row v-for="item in items" :key="item.id" :headers="headers" :item="item" :level="0" />
      <div class="v-table__empty" v-if="!items.length">Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import { isArrayContainsObjectsWithFields } from '@/helpers/validation';
import VTableRow from './VTableRow.vue';
import VIcon from './VIcon.vue';

export default {
  name: 'VTable',
  components: { VTableRow, VIcon },
  props: {
    headers: {
      type: Array,
      required: true,
      validator: isArrayContainsObjectsWithFields('name', 'label'),
    },
    items: {
      type: Array,
      required: true,
      validator: isArrayContainsObjectsWithFields('id', 'parentId', 'children'),
    },
    sorts: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      openedItemId: null,
    };
  },
  methods: {
    onClick(item) {
      this.openedItemId = item.id;
    },
    sort(field) {
      this.$emit('sort', field);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/theme.scss';

.v-table {
  width: 100%;
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
}
.v-table__headers {
  display: flex;
  border-bottom: 1px solid;
  background: $color-gray;

  & > .v-table__header:not(:last-child) {
    border-right: 1px solid;
  }
}
.v-table__header {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.v-table__rows {
  display: flex;
  flex-direction: column;
}
.v-table__empty {
  border-bottom: 1px solid;
  padding: 20px;
}
.v-table__header__icon-sort {
  cursor: pointer;
}
</style>
