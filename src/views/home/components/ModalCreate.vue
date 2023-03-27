<template>
  <v-modal title="Добавление работника" v-on="$listeners" width="700px">
    <form class="modal-create">
      <div class="modal-create__row">
        <label class="modal-create__label" for="name">Имя:</label>
        <v-input class="modal-create__control" id="name" v-model="name" />
      </div>
       <div class="modal-create__row">
        <label class="modal-create__label" for="phone">Телефон:</label>
        <v-input class="modal-create__control" id="phone" v-model="phone" />
      </div>
      <div class="modal-create__row">
        <label class="modal-create__label" for="parent">Начальник:</label>
        <v-select class="modal-create__control" id="parent" :options="options" v-model="parentId" />
      </div>
      <div v-if="isError" class="modal-create__error">
        Пожалуйста, заполните поля
      </div>
      <v-button class="modal-create__submit" label="Сохранить" color="success" @click="submit" type="button" />
    </form>
  </v-modal>
</template>

<script>
import { isArrayContainsObjectsWithFields } from '@/helpers/validation';
import { toFlatMap } from '@/helpers/array';
import {
  VButton, VSelect, VInput, VModal,
} from '@/ui';

export default {
  name: 'ModalCreate',
  components: {
    VButton, VSelect, VInput, VModal,
  },
  props: {
    workers: {
      type: Array,
      required: true,
      validator: isArrayContainsObjectsWithFields('id', 'name'),
    },
  },
  data() {
    return {
      name: '',
      phone: '',
      parentId: null,
      isError: false,
    };
  },
  computed: {
    options() {
      return toFlatMap(this.workers).map((worker) => ({ id: worker.id, text: worker.name }));
    },
  },
  methods: {
    submit() {
      if (!this.name || !this.phone) {
        this.isError = true;
        return;
      }
      this.isError = false;
      this.$emit('submit', { name: this.name, phone: this.phone, parentId: this.parentId });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/theme.scss';

.modal-create {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.modal-create__row {
  display: flex;
  align-items: center;
}
.modal-create__label {
  flex: 1;
}
.modal-create__control {
  flex: 2 1 200px;
}
.modal-create__submit {
  margin: 20px 0;
  width: 100%;
}
.modal-create__error {
  color: $color-red;
  position: absolute;
  bottom: 120px;
}
</style>
