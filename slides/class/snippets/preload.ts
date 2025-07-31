export class ReactiveProperty<T> {
    private listeners: ((newValue: T) => void)[] = [];
    private _value: T;
    constructor(initialValue: T) { this._value = initialValue; }
    // Подписчик получает уведомление при изменении свойства
    subscribe(listener: (newValue: T) => void) { this.listeners.push(listener); }
    // Сеттер изменяет значение и уведомляет подписчиков
    set value(newValue: T) { 
        this._value = newValue;
        this.notifyListeners();
    }
    // Геттер для чтения текущего значения
    get value(): T { return this._value; }
    // Оповещает всех подписчиков о новом значении
    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this._value));
    }
}