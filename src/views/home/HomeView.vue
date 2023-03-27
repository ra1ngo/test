<template>
  <div class="home">
    <div class="home__header">
      <h2>Работники</h2>
      <v-button icon="IconPlus" label="Добавить" @click="toggleModal(true)" />
    </div>

    <v-table
      class="home__table"
      :headers="headers"
      :items="workers"
      :sorts="sorts"
      @sort="sort"
    />

    <modal-create
      v-if="isOpenModal"
      :workers="workers"
      @close="toggleModal(false)"
      @submit="submit"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { VButton, VTable } from '@/ui';
import ModalCreate from './components/ModalCreate.vue';

export default {
  name: 'HomeView',
  components: { VButton, VTable, ModalCreate },
  data() {
    return {
      isOpenModal: false,
      headers: [
        { name: 'name', label: 'Имя' },
        { name: 'phone', label: 'Телефон' },
      ],
      sorts: {
        name: null,
        phone: null,
      },
    };
  },
  computed: {
    ...mapState('workers', {
      workers: ({ workers }) => workers,
    }),
  },
  methods: {
    ...mapMutations('workers', ['addWorker', 'sortWorkers']),
    toggleModal(isOpen) {
      this.isOpenModal = isOpen;
    },
    submit(worker) {
      this.isOpenModal = false;
      this.addWorker(worker);
    },
    sort(field) {
      this.sorts = (Object.entries(this.sorts)).reduce((acc, [key, value]) => {
        let sort = 'ASC';
        if (key === field && value !== 'DESC') {
          sort = 'DESC';
        }
        return { ...acc, [key]: sort };
      }, {});

      this.sortWorkers({ field, order: this.sorts[field] });
    },
  },
  created() {
    this.sort('name');
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 32px;
}
.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home__table {
  margin-top: 12px;
}
</style>
