/*
 * Реактивно вызывает коллбэк при изменении указанного атрибута элемента
 * Пример использования:
 * v-observe="{ handler: mySuperHandler, attributes: ['style'] }"
 */
export default {
  bind(el, binding) {
    const callback = (MutationRecordArr) => binding.value.handler(MutationRecordArr[0].target);
    // eslint-disable-next-line no-param-reassign
    el.observer = new MutationObserver(callback);
    el.observer.observe(el, {
      childList: false, subtree: false, attributes: true, attributeFilter: binding.value.attributes,
    });

    // Сразу же запускаем коллбэк
    binding.value.handler(el);
  },
  unbind(el) {
    el.observer.disconnect();
  },
};
