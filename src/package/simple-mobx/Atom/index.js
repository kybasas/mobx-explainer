import { globalState } from "../globalstate";

/**
 *  Класс реализующий подписики и уведомление для наблюдаеых значений
 *  Аналогичная сущность в mobx https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/atom.ts#L24
 */
export class Atom {
  constructor() {
    this._observers = new Set([]);
  }

  /**
   * @description Добавляет слушатель в массив слушателей
   * Добавляет наблюдаемое значение в зависимости реакции
   */
  observe(reaction) {
    this._observers.add(reaction);
    reaction.addObserver(this);
  }

  /**
   * @description Удаляет слушатель из массива слушателей
   * Удаляет наблюдаемое значение из зависимостей реакции
   */
  dispose(reaction) {
    this._observers.delete(reaction);
    reaction.removeObserver(this);
  }

  /**
   * @description метод перехватвает текущую реакцию из глобальной переменной и регестрирует ее себе
   * Аналогичный метод https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/atom.ts#L59
   * @protected
   */
  _reportObserved() {
    if (globalState.trackingDerivation) this.observe(globalState.trackingDerivation);
  }

  /**
   * @description Уведомляет слушателей об изменениях
   * @protected
   */
  _notify() {
    this._observers.forEach((reaction) => reaction.run());
  }
}
