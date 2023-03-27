<template>
  <div :style="{'--pad': `${level * 32}px`}">
    <div class="v-table-row">
      <template v-for="(field, fieldKey, id) in itemWithSortedFields">
        <div class="v-table-row__cell" v-if="fields.includes(fieldKey)" :key="id">
          <span class="v-table-row__cell-text">
            <v-icon v-if="!id && item.children.length" class="v-table-row__icon-collapse" :icon="collapseIcon" @click="toggleCollapse" />
            {{ field }}
          </span>
        </div>
      </template>
    </div>
    <template v-if="!isCollapse">
      <v-table-row v-for="child in item.children" :key="child.id" :headers="headers" :item="child" :level="level+1" />
    </template>
  </div>
</template>

<script>
import { isArrayContainsObjectsWithFields, isObjectContainsFields } from '@/helpers/validation';
import { sortObjectFields } from '@/helpers/object';
import VIcon from './VIcon.vue';

export default {
  name: 'VTableRow',
  components: { VIcon },
  props: {
    level: { type: Number, required: true },
    headers: {
      type: Array,
      required: true,
      validator: isArrayContainsObjectsWithFields('name', 'label'),
    },
    item: {
      type: Object,
      required: true,
      validator: isObjectContainsFields('id', 'parentId', 'children'),
    },
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    fields() {
      return this.headers.map((h) => h.name);
    },
    itemWithSortedFields() {
      return sortObjectFields(this.item, this.fields);
    },
    collapseIcon() {
      return this.isCollapse ? 'IconMinusBordered' : 'IconPlusBordered';
    },
  },
  methods: {
    toggleCollapse() {
      if (!this.item.children.length) return;
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {
    // Проверяем, что item содержат ключи, соответвующие полям 'name' из headers
    const isValidItem = isObjectContainsFields(...this.fields)(this.item);
    if (!isValidItem) throw new Error('ВЫ ТАМ ОШАЛЕЛИ?\r\nTable item do not match headers');
  },
};
</script>

<style lang="scss" scoped>
.v-table-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  & > .v-table-row__cell:not(:last-child) {
    border-right: 1px solid;
  }
  & > .v-table-row__cell:first-child .v-table-row__cell-text {
    padding-left: var(--pad);
  }
}
.v-table-row__cell {
  flex: 1;
  padding: 20px;
  height: 20px;
}
.v-table-row__cell-text {
  display: flex;
  align-items: center;
}
.v-table-row__icon-collapse {
  width: 24px;
  height: auto;
  margin-right: 8px;
  cursor: pointer;
}
</style>
