/*
 * Об ограничениях outClick:
 * Коллбэк на аут-клик вешается на самую верхнюю ноду документа (window)
 * Если еще где-то на странице прослушивается событие клика, то вначале отрабатывается нижний коллбек,
 * потом событие всплывает вверх, вызывая по очереди все коллбеки, которые встретит на своем пути.
 *
 * Из-за этого возможен конфликт двух обработчиков событий (@click на одном элементе и v-out-click на другом)
 *
 * Еще один кейс "неверного" срабатывания. Допустим при событии change внутри модалки меняется ее размер
 * Флоу такой: вызывается change, меняется размер, клик срабатывает уже на внешней области
 *

 * Поэтому коллбек от событий (click, change и прочие) иногда нужно вызывать через setTimeout(callback, 0) или nextTick
 */
export default {
  bind(el, binding) {
    function isContainsEvent(target, event) {
      const elements = event.composedPath();

      if (!target || !elements) return false;
      for (const element of elements) {
        if (element === window) continue;
        if (target?.contains(element)) return true;
      }

      return false;
    }

    // eslint-disable-next-line no-param-reassign
    el.clickCallback = (event) => {
      const isClicked = el === event.target || el.contains(event.target) || isContainsEvent(el, event);
      if (typeof binding.value === 'function' && !isClicked && el.offsetParent !== null) {
        binding.value(el, event);
      }
    };

    window.addEventListener('click', el.clickCallback);
  },
  unbind(el) {
    window.removeEventListener('click', el.clickCallback);
  },
};
