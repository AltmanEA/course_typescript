---
title: Инструменты разработки
canvasWidth: 800
---

# Инструменты разработки

---

# Платформа [Node.js](https://nodejs.org/en/)

- _Node.js_ - кросс-платформенная среда выполнения JavaScript с открытым исходным кодом.
- _Пакеты_ Node.js - программные модули для платформы, библиотеки или утилиты.
- _Менеджер пакетов_ (npm, yarn, pnpm, ...) - пакет для загрузки и запуска пакетов и его зависимостей.

---

# Платформа [Node.js](https://nodejs.org/en/)
## npm

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

# ```Package.json```

Это файл, который содержит информацию о проекте в экосистеме Node.js. Его основное назначение — хранить список зависимостей (библиотек), необходимых для работы проекта. Также файл включает другую метаинформацию, в том числе скрипты, данные об авторе и лицензии, описание и свойства проекта. 

---

# ```Package.json```

## JSON

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

```json {2,6,11|11-14|6-10}
{
  "name": "lab",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "~5.8.3",
    "vite": "^6.3.5"
  }
}
```

