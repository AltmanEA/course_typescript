---
title: Классы
canvasWidth: 800
routerMode: hash
monacoRunAdditionalDeps:
  - ./preload.ts
---

# Классы

---

# Для чего ввели классы

- Несколько объектов имеют одинаковые свойства и методы можно выделить в классы. Например: студенты, оценки и пр.
- Классы позволяют описать свойства и реализовать методы для группы объектов один раз. Это сокращает размер кода и упрощает работу с ним.
- Класс описывает тип объектов, что повышает надежность программ.
- Класс скрывает внутреннюю реализацию объекта, что снижает связность программы.

# Далее

- Когда в программе много классов, то начинают выделять общие части классов.

---

# Класс (простой пример)

```ts {monaco-run}
class Student {
  first_name: string;
  last_name: string;
}
const ivan = new Student();
(ivan.first_name = "Иван"), (ivan.last_name = "Иванов");
console.log(ivan.first_name, ivan.last_name);
```

---

# Конструктор (простой пример)

```ts {monaco-run}
class Student {
  first_name: string;
  last_name: string;
  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
const ivan = new Student("Иван", "Иванов");
console.log(ivan.first_name, ivan.last_name);
```

---

# Свойства класса (обзор)

<table><thead>
    <tr>
        <th>Язык программирования</th>
        <th>Правильное использование термина</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>Java, C++, PHP</td>
            <td><strong>Поле</strong></td>
        </tr>
        <tr>
            <td>C#, TypeScript</td>
            <td><strong>Свойство</strong></td>
        </tr>
        <tr>
            <td>Python</td>
            <td><strong>Атрибут</strong></td>
        </tr>
        <tr>
            <td>Ruby</td>
            <td><strong>Переменная экземпляра</strong></td>
        </tr>
    </tbody>
</table>

---

# Свойства класса (модификаторы, инициализация)

```ts {monaco-run}
class Student {
  readonly first_name: string;
  readonly last_name: string;
  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.full_name = `${first_name} ${last_name}`;
  }
  lesson = 0;
  full_name: string;
}
const ivan = new Student("Иван", "Иванов");
console.log(ivan.full_name, ivan.lesson);
```

---

# Методы класса

```ts {monaco-run}
class Student {
  first_name: string;
  last_name: string;
  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
  }
  full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
const ivan = new Student("Иван", "Иванов");
console.log(ivan.full_name());
```

---

# Модификаторы доступа

```ts {monaco-run}
class Student {
  private first_name: string;
  private last_name: string;
  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
  }
  full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
const ivan = new Student("Иван", "Иванов");
console.log(ivan.full_name());
console.log(ivan.first_name);
```

---

# Закрытые свойства других объектов класса

```ts {monaco-run}
class Count {
  private num = 0;
  inc(): number {
    return this.num++;
  }
  add(other: Count): number {
    this.num += other.num;
    return this.num;
  }
}
const count = new Count();
console.log(count.inc());
console.log(count.inc());
console.log(count.add(count));
```

---

# Сокращенная форма конструктора

```ts {monaco-run}
class Student {
  constructor(public first_name: string, public last_name: string) {}
}
const ivan = new Student("Иван", "Иванов");
console.log(ivan.first_name);
console.log(ivan.last_name);
```

---

# Первичные и вторичные конструкторы

- Для многих классов объектов желательно предусмотреть несколько способов реализации.
- Для корректной инициализации несколькими конструкторами во многих языках выделяют первичный и вторичный конструкторы.
- Первичный конструктор гарантирует корректную инициализацию объекта.
- Вторичные конструкторы предоставляют альтернативные способы инициализации объекта, и вызывают первичный конструктор.

---

# Перегрузка методов (конструктора) (лучше не использовать)

```ts {monaco-run}
class Student {
  first_name: string; last_name: string;
  full_name(): string { return `${this.first_name} ${this.last_name}`; }
  constructor(full_name: string);
  constructor(names: [string, string]);
  constructor(name: string | [string, string]) { // constructor(...args: any[]) 
    if (typeof name === "string") {
      const tmp = name.split(" ");
      this.first_name = tmp[0]; this.last_name = tmp[1];
    } else {
      this.first_name = name[0]; this.last_name = name[1];
    } } }
console.log(new Student(["Иван", "Иванов"]).full_name());
console.log(new Student("Петр Петров").full_name());
```

---

# Копирующий конструктор (прием программирования)

```ts {monaco-run}
class Student {
  first_name: string;
  last_name: string;
  full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
  constructor(first_name: string, last_name: string) {
    this.first_name = first_name;
    this.last_name = last_name;
  }
  copy(first_name?: string, last_name?: string): Student {
    return new Student(
      first_name ?? this.first_name,
      last_name ?? this.last_name
    );
  }
}
const ivan = new Student("Иван", " Иванов");
const ivan2 = ivan.copy();
console.log(ivan2.full_name());
console.log(ivan === ivan2);
console.log(ivan.copy("Петр").full_name());
```

---

# Сложные конструкторы

```ts {monaco-run}
class Student {
  first_name: string;
  last_name: string;
  init(names: string[]): void {
    this.first_name = names[0];
    this.last_name = names[1];
  }
  constructor(name: string) {
    this.init(name.split(" "));
  }
}
console.log(new Student("Петр Петров"));
```

---

# Сложные конструкторы 2

```ts {monaco-run}
class Student {
  first_name: string;
  last_name: string;
  full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
  constructor(name: string) {
    const tmp = this.full_name().split(" ");
    this.first_name = tmp[0];
    this.last_name = tmp[1];
  }
}
console.log(new Student("Петр Петров"));
```

---

# Статические свойства

```ts {monaco-run}
class Student {
  static count = 0;
  constructor(public first_name: string, public last_name: string) {
    Student.count++;
  }
}
new Student("Иван", "Иванов");
console.log(Student.count);
new Student("Петр", "Петров");
console.log(Student.count);
```

---

# Статические методы

```ts {monaco-run}
class Student {
  static count = 0;
  constructor(public first_name: string, public last_name: string) {
    Student.count++;
  }
  static info(): string {
    return `Всего ${Student.count} студентов`;
  }
}
new Student("Иван", "Иванов");
console.log(Student.info());
new Student("Петр", "Петров");
console.log(Student.info());
```

---

# Класс во время выполнения

```ts {monaco-run}
class Student {
  static count = 0;
  static who_i() {
    return this;
  }
}
const s_class = Student.who_i();
console.log(s_class);
console.log(s_class.count);  
```

---

# Параметризованные классы

```ts {monaco}
class Collection<T> {
    private items: T[] = [];
    // Добавляет элемент в коллекцию
    add(item: T): void {
        this.items.push(item);
    }
    // Извлекает первый элемент коллекции
    pop(): T | undefined {
        return this.items.pop();
    }
    // Получает длину коллекции
    size(): number {
        return this.items.length;
    }
    // Получает все элементы коллекции
    getAll(): T[] {
        return [...this.items];
    }
}
```

---

# Параметризованные классы, ограничения

```ts {monaco}
class KeyValueStore<K extends string | number, V> {
    private storage: Map<K, V> = new Map();
    // Добавляет новую пару ключ-значение
    put(key: K, value: V): void {
        this.storage.set(key, value);
    }
    // Получает значение по ключу
    get(key: K): V | undefined {
        return this.storage.get(key);
    }
    // Показывает размеры хранилища
    size(): number {
        return this.storage.size;
    }
}
```

---

# Метод доступа

```ts {monaco-run}
class Index {
    private _index: number = 0
    get index(): number {
        return this._index }
    set index(ind: number) {
        if (ind % 1 == 0 && ind > -1 && ind < 9)
            this._index = ind } }
const index =  new Index()
index.index = -1; console.log(index.index)
index.index = 1; console.log(index.index)
index.index = 1.5; console.log(index.index)
index.index = 10; console.log(index.index)
```

---

# Реактивные свойства

```ts {monaco}
class ReactiveProperty<T> {
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
```

---

# Реактивные свойства (Продолжение)

```ts {monaco-run}
import { ReactiveProperty } from "./preload.ts";
class UserProfile {
    username: string;
    reactiveAge: ReactiveProperty<number>; // Реактивное свойство возраста
    constructor(username: string, age: number) {
        this.username = username;
        this.reactiveAge = new ReactiveProperty(age);
    }
    updateAge(newAge: number) {
        this.reactiveAge.value = newAge;
    }
}
const profile = new UserProfile('John Doe', 30);
profile.reactiveAge.subscribe((newAge: number) => {
    console.log(`Пользователь стал старше: новый возраст - ${newAge}`);
});
profile.updateAge(31); // Логика сработает и выведет сообщение
```

--- 

# Ленивые свойства

```ts {monaco}
class LazyLoad {
    private _load: string | null= null
    get load(){
        if(this._load === null){
            this._load = longLoad()
        }
        return this._load
    }    
}
function longLoad(): string {
  // долгая операция
  return "Loaded"
}
```

---

# Классы и типы. 

```ts {monaco-run}
class Student {        
    constructor( public name: string, public place: string) { } 
    info(): string {
        return `${this.name}, группа ${this.place}`
    }
  }
class Tutor {        
    constructor( public name: string, public place: string) { }
    info(): string {
        return `${this.name}, кафедра ${this.place}`
    }
}
const ivan: Tutor = new Student("Иван", "22з")
console.log(ivan.info())
```


---

# Классы и типы. 

```ts {monaco-run}
class Student {        
    constructor( public name: string, public place: string) { } 
    info(): string {
        return `${this.name}, группа ${this.place}`
    }
  }
class Tutor {        
    constructor( public name: string, public place: string) { }
    info(): string {
        return `${this.name}, кафедра ${this.place}`
    }
    static institute = "МГУ"  
}
const ivan: Tutor = new Student("Иван", "22з")
console.log(ivan.info())
```

---

# Переменные типа класс

```ts {monaco-run}
const someClass = class <Type> {
    content: Type
    constructor(value: Type) {
        this.content = value
    }
}
// const m: someClass<string>
const m = new someClass("Hello, world")
console.log(m.content)
```