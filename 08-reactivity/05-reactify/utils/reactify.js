import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  console.log(func)
  return (...arg) => computed(() => {
    let argFunc = [];
    for (let a of arg) {
      if (isRef(a)) argFunc.push(a.value)
     else argFunc.push(a)
    }
    return func(...argFunc)
  });
}
