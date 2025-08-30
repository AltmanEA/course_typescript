---
title: Инструменты разработки
canvasWidth: 800
routerMode: hash
---

# Инструменты разработки

---

# Visual Studio Code

---

# Платформа [Node.js](https://nodejs.org/en/)

- _Node.js_ - кросс-платформенная среда выполнения JavaScript с открытым исходным кодом.
- _Пакеты_ Node.js - программные модули для платформы, библиотеки или утилиты.
- _Менеджер пакетов_ (npm, yarn, pnpm, ...) - пакет для загрузки и запуска пакетов и его зависимостей.

---

# Платформа [Node.js](https://nodejs.org/en/)

## Папка проекта

- ```package.json``` - конфигурация проекта
- ```node_modules``` - папка с установленными зависимостями

## Установка зависимостей

```bash
npm install --global typescript

npm list -g --depth=0

npm install
```

---

# Vite

````md magic-move

```bash
npm create vite@latest
Need to install the following packages:
create-vite@6.5.0
Ok to proceed? (y)
```

```bash
> npx
> create-vite

│
◆  Project name:
│  vite-project
```

```bash
◇  Project name:
│  lab
│
◆  Select a framework:
│  ● Vanilla
│  ○ Vue
│  ○ React
│  ○ Preact
│  ○ Lit
│  ○ Svelte
│  ○ Solid
│  ○ Qwik
│  ○ Angular
│  ○ Marko
│  ○ Others
```

```bash
◇  Select a framework:
│  Vanilla
│
◆  Select a variant:
│  ● TypeScript
│  ○ JavaScript
```

```bash
◇  Select a variant:
│  TypeScript
│
◇  Scaffolding project in C:\sandbox\lab...
│
└  Done. Now run:

  cd lab
  npm install
  npm run dev
```

````

---

# JSON

```json
{
   "firstName": "Иван",
   "lastName": "Иванов",
   "address": {
       "streetAddress": "Московское ш., 101, кв.101",
       "city": "Ленинград",
       "postalCode": 101101
   },
   "phoneNumbers": [
       "812 123-1234",
       "916 123-4567"
   ]
}
```

---

# ```Package.json```

```json {2,5,11|11-16|17-19|5-10}
{
  "name": "course_typescript_lab",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "t:test": "tsx ./utils/test.ts"
  },
  "devDependencies": {
    "@types/node": "^24.0.12",
    "typescript": "~5.8.3",
    "vite": "^7.0.3",
    "vitest": "^3.2.4"
  },
  "dependencies": {
    "tsx": "^4.20.3"
  }
}
```

---

# Задачи

```basic01.js```
```ts
/* Реализовать функцию, которая возвращает большее из двух чисел. */
export function max(a, b) {
  return a
}
```

```basic01.test.js```
```ts
import { test, expect } from 'vitest'
import { max } from './basic01'
test('max should return bigger number', () => {
  expect(max(1, 2)).toBe(2)
  expect(max(2, 1)).toBe(2)
  expect(max(1, 1)).toBe(1)
})
```

---

# Тестирование

```bash
pnpm test basic01
```
<img src="/test_fail.png" width="60%" style="display: block; margin: 0 auto;"/>

```bash
 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
```


---

# Решение задачи

```ts
export function max(a, b) { return a > b ? a : b }
```

```bash
 RERUN  src/basic/basic01.js x1 
        Filename pattern: basic01

 ✓ src/basic/basic01.test.js (1 test) 2ms
   ✓ max should return bigger number 1ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  11:31:29
   Duration  15ms

 PASS  Waiting for file changes...
       press h to show help, press q to quit
```



