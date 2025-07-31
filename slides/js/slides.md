---
title: Обзор языка JavaScript
canvasWidth: 800
---

# Обзор языка JavaScript

---

# Что в обзоре

- Базовый синтаксис языка

# Чего нет

- Применения синтаксических конструций в алгоритмах
- Устаревшие и не нужные для typescript конструкции
- Браузер и платформа Node.js
- Продвинутые возможности (классы, промисы, ...)
- Инструменты разработки (сборка, отладка, ...)

---

# Учебники и документация

- [Современный учебник JavaScript](https://learn.javascript.ru/)
- [Курс JavaScript (Хекслет)](https://code-basics.com/ru/languages/javascript)
- [MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference)

---

# Определение переменных

```js {monaco-run}
let x,
  y = 1;
console.log("1: x = " + x + ", y = " + y);
x = 1;
y++;
console.log("2: x = " + x + ", y = " + y);
```

---

# Определение констант (значений)

```js {monaco-run}
let x = 2;
console.log("x = " + x);
const y = x * 2;
console.log("y = " + y);
y++;
```

---

# Типы данных

```js {monaco-run}
console.log(typeof 1);
console.log(typeof 0.1);
console.log(typeof 10n);
console.log(typeof "text");
console.log(typeof Symbol("id"));
console.log(typeof true);
```

---

# Сложные типы данных

```js {monaco-run}
console.log(typeof {});
console.log(typeof []);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof function () {});
```

---

# Математические операции

```js {monaco-run}
console.log(2 + 2 * 2);
console.log(5 / 2, 5 % 2);
console.log(5 ** 2);
console.log(Math.trunc(5 / 2));
```

---

# Математические операции

```js {monaco-run}
let x = 5;
x += 2;
console.log(x);
console.log(x++);
console.log(++x);
```

---

# Математические операции

```js {monaco-run}
let x = 1 / 0;
console.log(x);
console.log(x * 0);
```

---

# Побитовые операции

```js {monaco-run}
function binlog(dec) {
  console.log((dec >>> 0).toString(2));
}
binlog(0b011 & 0b101);
binlog(0b011 | 0b101);
binlog(0b011 ^ 0b101);
binlog(~0b011);
binlog(0b011 << 1);
binlog(-2);
binlog(-2 >> 1);
binlog(-2 >>> 1);
```

---

# Операторы сравнения

```js {monaco-run}
console.log(1 == 1);
console.log(1 != 1);
console.log(1 < 1);
console.log(1 > 1);
console.log(1 <= 1);
console.log(1 >= 1);
```

---

# Сравнение с учетом типов

```js {monaco-run}
console.log(1 == "1");
console.log(1 === "1");
console.log(1 != "1");
console.log(1 !== "1");
```

---

# Логические операции

```js {monaco-run}
console.log(true && false);
console.log(true || false);
console.log(!true);

let a;
console.log(a && 4 / a == 0);
```

---

# Условные операторы

```js {monaco-run}
let a = 1,
  b = 2;
const max = a > b ? a : b;
console.log(max);
```

```js {monaco-run}
let a = 1,
  b = 2,
  max;
if (a > b) {
  max = a;
} else {
  max = b;
}
console.log(max);
```

---

# Операторы для неопределенных значений

```js {monaco-run}
let x;
console.log(x ?? 0);
x ??= 1;
console.log(x);
```

---

# Оператор выбора

```js {monaco-run}
let x = 1;
switch (x) {
  case 0:
    console.log("x = 0");
    break;
  case 1:
    console.log("x = 1");
    break;
  default:
    console.log("x = " + x);
}
```

---

# Циклы. Итерация

```js {monaco-run}
let x = 7,
  n = 0;
while (x) {
  n++;
  x = Math.floor(x / 2);
}
console.log(n);
```

```js {monaco-run}
let x = 7,
  n = 0;
do {
  n += x % 2;
  x = Math.floor(x / 2);
} while (x);
console.log(n);
```

---

# Циклы. Перебор

```js {monaco-run}
let s = 0;
for (let i = 0; i < 10; i++) {
  s += i;
}
console.log(s);
console.log(i);
```

---

# Циклы. Прерывание

```js {monaco-run}
let j;
for (let i = 2; i < 10; i++) {
  for (j = 2; j < i - 2; j++) {
    if (i % j == 0) {
      break;
    }
  }
  if (i % j != 0) {
    console.log(i);
  }
}
```

---

# Функции

```js {monaco-run}
function sum_square(x, y = 1) {
  // x, y - параметры, sum - имя
  // тело функции
  x = x ** 2;
  y = y ** 2;
  const s = x + y; // s - локальная переменная
  return s;
}
let a = 1,
  b = 2;
console.log(sum_square(a, b)); // 1, 2 - аргументы
console.log(a, b);
```

---

# Функциональные выражения и стрелочные функции

```js {monaco-run}
const sum_square = function(x, y = 1) { 
  return x ** 2 + y ** 2;
}
console.log(sum_square(1, 2));
console.log(typeof sum_square);
```
```js {monaco-run}
const sum_square = (x, y = 1) => x ** 2 + y ** 2;
console.log(sum_square(1, 2));
console.log(typeof sum_square);
```

---

# Функции высшего порядка и коллбэки

```js {monaco-run}
// some - функция высшего порядка (higher-order function)
function some(arr, predicate) {
  // predicate - коллбэк (callback)
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return true;
    }
  }
  return false;
}

console.log(some([1, 2, 3], (x) => x > 2));
console.log(some([1, 2, 3], (x) => x > 4));
```

---

# Строки

```js {monaco-run}
console.log("Двойные кавычки" + ' и "одинарные"')
console.log("Можно использовать \"экранированные\" и \n специальные символы" )
console.log(`В апострофах можно
переносить строки и использовать выражения ${1 + 1}`)
let s = "Строка";
s[0] = "s"; // нельзя
console.log(s[0], s);
```

---

# Свойства и методы строк

```js {monaco-run}
const a = "строка"

console.log("Длина строки: " + a.length)
console.log("Третий символ: " + a[2])
console.log("Позиция буквы \"о\": " + a.indexOf("о"))
console.log("В верхнем регистре: " + a.toUpperCase())
console.log("Срез: " + a.slice(2, 4))
console.log("Поиск: " + a.search("рок"))
console.log("Замена: " + a.replace("рок", "джаз"))
```

---

# Массивы

```js {monaco-run}
console.log(new Array(), []);
console.log(new Array(5), [0, 0, 0, 0, 0], new Array(5).fill(0));
const a = [1, 2, 3];
a[0] = 2; console.log("a[0] = 2", a);
a.push(4); console.log("a.push(4)", a);
a.pop(); console.log("a.pop()", a);
a.unshift(0); console.log("a.unshift(0)", a);
a.shift(); console.log("a.shift()", a);
```

---

# Свойства и методы массивов

```js {monaco-run}
const arr = [1, 2, 3, 4, 5]

console.log(arr.length)
console.log(arr.slice(2, 4))
console.log(arr.concat(arr))
console.log(arr.indexOf(3))
```

---

# Перебор массивов

```js {monaco-run}
const arr = [1, 2, 3, 4, 5]
let s = 0
for (let i = 0; i < arr.length; i++) {
  s += arr[i]
} 
console.log(s); s=0
for (let x of arr) { 
  s += x
} 
console.log(s); s=0
arr.forEach(x => s += x)  
console.log(s)
```

---

# Операция распространения

```js {monaco-run}
const arr = [1, 2, 3]

const sum = (x, y, z) => x + y + z
console.log(sum(...arr))

const arr2 = [...arr, 4, 5]
console.log(arr2)
```

---

# Многомерные массивы

```js {monaco-run}
const arr = [
  [1, 2, 3],
  [4, 5],
  [7]
]
console.log(arr[0][1])
console.log(arr[2][1])
```
