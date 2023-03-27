import { findParent } from '@/helpers/array';

const stateWorkers = () => ({
  workers: [],
  counterId: 1,
});

const getters = {
};

const mutations = {
  addWorker(state, worker) {
    // В реальном приложения вместо localStorage используется бэкенд
    // Соответственно здесь должна быть бэкендовская проверка

    state.counterId += 1;
    const workerAdded = { ...worker, id: state.counterId, children: [] };

    if (worker.parentId === null) {
      state.workers.push(workerAdded);
      return;
    }

    const parent = findParent(state.workers, workerAdded.parentId);
    if (!parent) throw new Error('ВЫ ТАМ ОШАЛЕЛИ?\r\nParent not found');
    parent.children.push(workerAdded);
  },
  sortWorkers(state, { field, order }) {
    (function sort(array) {
      array.sort((worker1, worker2) => {
        if (worker1.children.length) sort(worker1.children);
        if (worker2.children.length) sort(worker2.children);

        if (order === 'DESC') return worker1[field] > worker2[field] ? -1 : 1;
        return worker1[field] > worker2[field] ? 1 : -1;
      });
    }(state.workers));
  },
};

const actions = {
  // Т.к. использование реального бэкенда не требуется
  // все изменения стора в рамках тестового задания будут производится через mutations
};

export default {
  state: stateWorkers, getters, mutations, actions,
};
