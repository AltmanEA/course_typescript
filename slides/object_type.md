---
title: Объекты и их типы
canvasWidth: 800
monacoRunAdditionalDeps:
  - deep-equal
---

# Объекты и их типизация в typescript

---

# Что рассматривается

- Понятие объекта, ссылки на объект и типы объекта и ссылки
- Создание, копирование, сравнение объектов на этапе исполнения
- Контроль типов на этапе компиляции 

# Что будет позже

- Проектирование объектов в программе (классы и др.)

---
layout: two-cols-header
---

# Объект и ссылка

::left::

```ts {monaco}
const a = {
    "x": 1
}
```

::right::

```mermaid {theme: 'neutral'}
flowchart LR
    ref{{a}} --> obj("x: 1")
```

---

# Объект и ссылка

```mermaid {theme: 'neutral', flowchart: { nodeSpacing: 30 }}
flowchart LR    
    ref{{ссылка}}
    subgraph obj ["Объект"]
        methods{{методы}}
        prop1([свойство1])
        prop2([свойство2])
        props([...])
    end    
    subgraph proto ["Прототип"]
        m1([метод1])
        m2([meтод2])
        ms([...])
    end
    ref --> methods
    methods --> m1
```

---

# Тип ссылки

```ts {monaco}
const a: { "x": number } = { 
    "x": 1 
}
const b = { 
    "x": 1 
}
type A = { "x": 1 }
const c: A = { 
    "x": 1 
}
a.x = 2
b.x = 2
c.x = 2
```

---

# Типы ссылки и тип объектов

```ts {monaco}
const a = { 
    "x": 1, 
    "y": 2 
}
const b = { 
    "x": 1 
}
type A = { "x": number }
type B = { "x": number, "y": number }

// Принцип подстановки (упрощенная версия)
const c: A = a
const d: A = b
const e: B = a
const g: B = b
```

---
layout: two-cols-header
---

# Копирование ссылки

::left::

```ts {monaco-run}
const a = { "x": 1 }

const b = a // Копирование ссылки

a.x = -1
console.log(a)
console.log(b)
```

::right::

```mermaid {theme: 'neutral'}
flowchart LR
    refa{{a}} --> obj("x: 1")
    refb{{b}} --> obj
```

---
layout: two-cols-header
---

# Копирование объекта

Хорошо спроектированные объекты имеют свой метод копирования!

::left::

```ts {monaco-run}
const a = { "x": 1 }

// Копирует любые объекты
const c = Object.assign({}, a)

a.x = -1
console.log(a)
console.log(c)

```

::right::

```mermaid {theme: 'neutral'}
flowchart LR
    refa{{a}} --> obj1("x: 1")
    refb{{с}} --> obj2("x: 1")
    obj1 --> proto("Прототип")
    obj2 --> proto
```

---

# Копирование массивов

```ts {monaco-run}
const a: number[] = [1, 2, 3]
console.log(Object.assign({}, a))
console.log(a.slice())
console.log(Array.from(a))
console.log([...a])
```

---
layout: two-cols-header
---

# Вложенные объекты

::left::

```ts {monaco-run}
const a = {
    x: { x: 1 }
}
const b = Object.assign({}, a)
a.x.x=-1
console.log(b)
```

::right::

```mermaid {theme: 'neutral'}
flowchart LR
    refx --> objx("x: 1")
    refy --> objx
    subgraph x [" "]
        refx{{x}}
    end
    subgraph y  [" "]
        refy{{x}}
    end
    refa{{a}} --> x
    refb{{b}} --> y
```

---

# Копирование вложенных объектов

```ts {monaco-run}
const a = {
    x: {
        x: 1
    }
}
const b = Object.assign({}, a)
const c = JSON.parse(JSON.stringify(a)) as typeof a
a.x.x=-1
console.log(b)
console.log(c)
```

---

# Копирование вложенных массивов

```ts {monaco-run}
const a = [ [0, 1], [2]] // [ [[0], [0, 1]], [[2]]]
const b = [...a]
const c = JSON.parse(JSON.stringify(a)) as typeof a
const d = a.map(e => e.slice())
a[0][0] = -1 // a[0][0][0] = -1
console.log(b)
console.log(c)
console.log(d)
```

---

# Сравнение примитивных типов

```ts {monaco-run}
// any - тип, отключающий ts
// использовать только в крайних случаях
const a: any = 0
const b: any = "0"
console.log(a==b, a===b)
```

---

# Сравнение объектов

```ts {monaco-run}
const a = { x: 1}
const b = a
const c = Object.assign({}, a)
const d = { x: 1}
console.log(a==b, a===b)
console.log(a==c, a===c)
console.log(a==d, a===d)
```

---

# Структурное сравнение массивов. Параметры типа (Generic)

```ts {monaco-run}
// T - параметр типа, вся функция - generic
function array_equals<T>(a: T[], b: T[]): boolean {
    if (a.length != b.length) return false    
    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false
    return true
}

const a = [1, 2, 3]
console.log(array_equals<number>(a, [1, 2, 3]))
console.log(array_equals(a, [1, 2]))
console.log(array_equals(["a", "b", "c"], ["a", "b", "c"]))
```

---

# Глубокое сравнение объектов

```ts {monaco-run}
import deepEqual from "deep-equal"

const a = { x: { x: 1 } }
const b = { x: { x: 1 } }
console.log(deepEqual(a, b))
console.log(JSON.stringify(a) == JSON.stringify(b))
    
const c = { x: { y: 2, x: 1 } }
const d = { x: { x: 1, y: 2 } }
console.log(deepEqual(c, d))
console.log(JSON.stringify(c) == JSON.stringify(d))
```

---

# Методы объектов и функции

<div class="grid grid-cols-2 gap-4">
  <div>
```ts {monaco-run}
const y = {
    "x": 1,
    "inc": function () {
        this.x += 1
    }
}
y.inc()
console.log(y)
```
  </div>
  <div>
```ts {monaco-run}
type A = { x: number }
const x = { x: 1 }
function inc(a: A): A {
    a.x += 1
    return a
}
inc(x)
console.log(x)
```
  </div>
</div>


---

# Указатель this

<img src="./this.png" width="100%"/>
