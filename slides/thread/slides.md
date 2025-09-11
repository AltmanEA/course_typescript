---
title: Разделение потоков
canvasWidth: 800
routerMode: hash
monacoRunAdditionalDeps:
  - ./preload.ts
  - neverthrow
---

# Разделение потоков

---

# О чем речь

- Обработка ошибок (при ошибке нужно прервать выполнении основной логики программы и обработать ошибку)
- Асинхронные запросы (вместо ожидания ответа от долгого запроса можно выполнять другую работу).
- Обработка ошибок при асинхронном запросе может привести к разветвлению логики.


---

# Проблема обработки ошибок

```ts {monaco-run}
function sumInt(a: string, b: string): number | null {
    const an = Number(a)
    if (Number.isNaN(an)) return null
    if (an % 1 !== 0) return null
    const bn = Number(b)
    if (Number.isNaN(bn)) return null
    if (bn % 1 !== 0) return null
    return an + bn
}
console.log(sumInt("1", "1"))
console.log(sumInt("1.1", "1"))
console.log(sumInt("a", "b"))
```

---

# Если не обрабатывать ошибки

```ts {monaco-run}
function sumInt(a: string, b: string): number | null {
    return Number(BigInt(a) + BigInt(b))
}
console.log(sumInt("1", "1"))
console.log(sumInt("1.1", "1"))
console.log(sumInt("a", "b"))
```


---

# Отделение основной логики от обработки ошибок

```ts {monaco-run}
function sumInt(a: string, b: string): number | null {
    try {
        return Number(BigInt(a) + BigInt(b))
    } catch (e) {
        return null
    }
}
console.log(sumInt("1", "1"))
console.log(sumInt("1.1", "1"))
console.log(sumInt("a", "b"))
```


---

# Проброс ошибок

```ts {monaco-run}
function sumInt(a: string, b: string): number  {
        return Number(BigInt(a) + BigInt(b))
}
function safe_sum(a: string, b: string): number | null {
    try {
        return sumInt(a, b)
    } catch (e){
        return null
    }
}
console.log(safe_sum("1", "1"))
console.log(safe_sum("0.1", "1"))
console.log(safe_sum("a", "b"))
```

---

# Информация об ошибке

```ts {monaco-run}
import { sumInt }  from "./preload.ts";
function safe_sum(a: string, b: string): number | null {
    try {
        return sumInt(a, b)
    } catch (e){
        console.log((e as Error).message)
        return null
    }
}
console.log(safe_sum("1", "1"))
console.log(safe_sum("0.1", "1"))
console.log(safe_sum("a", "b"))
```


---

# Класс Error

```ts {monaco-run}
import { sumInt }  from "./preload.ts";
function safe_sum(a: string, b: string): number | null {
    try { return sumInt(a, b) } 
    catch (e){
        const ee: Error = e as Error
        console.log("message: " + ee.message)
        console.log("stack: " + ee.stack)
        console.log("name: " +  ee.name)
        return null } }
console.log(safe_sum("0.1", "1"))
```


---

# TypeError

```ts {monaco-run}
const obj:any = {};
try {
  obj.someMethod(); 
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Ошибка типа: ' + error.message); 
  }
}
```


---

# RangeError

```ts {monaco-run}
try {
  const array = new Array(-1); // Неверная длина массива
} catch (error) {
  if (error instanceof RangeError) {
    console.error('Ошибка диапазона: ' + error.message);
  }
}
```

---

# Пользовательские ошибки

```ts {monaco-run}
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError'; } }
class NetworkError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'NetworkError'; } }
try {
  throw new ValidationError('email', 'Invalid email format');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Ошибка в поле ${error.field}: ${error.message}`); } }
```

---

# Асинхронные операции

Выполняются асинхронно (следующая операция не синхронизируется с окончанием текущей)

- Сетевые запросы (HTTP, API)
- Работа с файловой системой
- Таймеры (setTimeout, setInterval)
- Базы данных
- ...

---

# Callback Hell

```ts
function getUserData(userId: number, callback: (error: Error | null, data?: any) => void) {
  getUser(userId, (error, user) => {
    if (error) return callback(error);    
    getPosts(user.id, (error, posts) => {
      if (error) return callback(error);      
      getComments(posts[0].id, (error, comments) => {
        if (error) return callback(error);        
        callback(null, { user, posts, comments });
      });
    });
  });
}
```

---

# Promise

```ts
const promise = new Promise<T>((resolve, reject) => {
  // Асинхронная операция
  if (/* успех */) {
    resolve(value); // Успешное выполнение
  } else {
    reject(error); // Ошибка
  }
});
```

---

# Примеры promise

```ts
// Промис, который резолвится в число
const timeoutPromise = new Promise<number>((resolve) => {
  setTimeout(() => {
    resolve(42); // Возвращаем число
  }, 1000);
});
// Промис, который может вернуть ошибку
const fetchData = new Promise<string>((resolve, reject) => {
  const success = Math.random() > 0.5;
  setTimeout(() => {
    if (success) {
      resolve("Данные получены!");
    } else {
      reject(new Error("Ошибка загрузки"));
    }
  }, 1000);
});
```

---

#  Промисы для примеров

```ts
interface User { id: number; name: string; }
interface Post { userId: number; title: string; }
function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.25) { resolve({ id, name: `User ${id}` });
      } else { reject(new Error(`Failed to fetch user ${id}`));}
    }, 100);});
const fetchUserData = (id: number): Promise<User> => 
  Promise.resolve({ id, name: `User ${id}` });
const fetchUserSettings = (id: number): Promise<{ theme: string }> => 
  Promise.resolve({ theme: "dark" });
function fetchUserPosts(userId: number): Promise<Post[]> {
  return Promise.resolve([
    { userId, title: "Post 1" },
    { userId, title: "Post 2" } ]); }
```

---

# Последовательные асинхронные вызовы

```ts {monaco-run}
import { fetchUser, fetchUserPosts, User, Post }  from "./preload.ts";
fetchUser(1)
  .then((user: User) => {
    console.log("Пользователь: " + JSON.stringify(user));
    return fetchUserPosts(user.id); })
  .then((posts: Post[]) => {
    console.log("Посты пользователя: " + JSON.stringify(posts));
    return posts.length;  })
  .then((postCount: number) => { console.log("Количество постов: " + postCount); })
  .catch((error: Error) => { console.error("Ошибка: " + error.message); })
  .finally(() => { console.log("Запрос завершен"); });
```


---

# Обработка ошибок

```ts {monaco-run}
import { fetchUser, fetchUserPosts, User, Post } from "./preload.ts";
fetchUser(1).then( (user: User) => {
    console.log("Пользователь: " + JSON.stringify(user));
    return fetchUserPosts(user.id); },
  (error: Error) => { 
    console.error("Ошибка получения пользователя: " + error.message);
    return [] as Post[]; }
).then( (posts: Post[]) => {
    console.log("Посты пользователя: " + JSON.stringify(posts));
    return posts.length; },
  (error: Error) => { 
    console.error("Ошибка получения постов: " + error.message);
    return 0; }
).then( (postCount: number) => { console.log("Количество постов: " + postCount); },
  (error: Error) => { console.error("Неожиданная ошибка: " + error.message); }
).finally(() => { console.log("Запрос завершен"); });
```

---

# Параллельные асинхронные вызовы

```ts {monaco-run}
import { fetchUserData, fetchUserSettings, User }  from "./preload.ts";
Promise.all([
  fetchUserData(1),
  fetchUserSettings(1),
  Promise.resolve("additional data")
])
  .then(([user, settings, additional]: [User, { theme: string }, string]) => {
    console.log("Все данные получены: " + JSON.stringify({ user, settings, additional }));
  })
  .catch((error: Error) => {
    console.error("Ошибка в одном из запросов: " + error);
  });
```

---

#  Async/Await - Синтаксический сахар

```ts {monaco-run}
import { fetchUser, fetchUserPosts, User, Post }  from "./preload.ts";
async function getUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    if (error instanceof Error) { 
      console.error("Ошибка получения данных: " + error.message);
    }
    throw error; } }
async function main() {
  try {
    const data = await getUserWithPosts(1);
    console.log("Данные: " + JSON.stringify(data));
  } catch (error) { console.error("Фатальная ошибка: " + error); } }
main()
```

---

# Функциональный подход к обработке ошибок

```ts
// Базовый тип Result (Either)
type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };
function success<T>(value: T): Result<T> { 
  return { success: true, value }; }
function failure<E = Error>(error: E): Result<never, E> {
  return { success: false, error }; }
// Пример использования
function parseNumber(str: string): Result<number> {
  const num = Number(str);
  return isNaN(num) 
    ? failure(new Error(`Invalid number: ${str}`))
    : success(num);
}
```

---

# Функциональный парсер

```ts {monaco}
import { Result, failure, success}  from "./preload.ts";
type ParseError = 
  | 'INVALID_NUMBER' 
  | 'NOT_INTEGER' 
  | 'NEGATIVE_NUMBER'; // добавим для примера
function parseInteger(str: string): Result<number, ParseError> {
  const num = Number(str);
  if (Number.isNaN(num)) { return failure('INVALID_NUMBER'); }
  if (num % 1 !== 0) { return failure('NOT_INTEGER'); }
  if (num < 0) { return failure('NEGATIVE_NUMBER'); }
  return success(num) as Result<number, ParseError>;
}
```

---

# Функциональный сумматор

```ts {monaco-run}
import { Result, failure, success, ParseError, parseInteger}  from "./preload.ts";
function sumIntFunctional(a: string, b: string): Result<number, ParseError> {
  const aResult = parseInteger(a);
  const bResult = parseInteger(b);
  if (!aResult.success && !bResult.success) {
    return failure(`Both arguments invalid: ${aResult.error}, ${bResult.error}`); }
  if (!aResult.success) {
    return failure(`First argument invalid: ${aResult.error}`); }
  if (!bResult.success) {
    return failure(`Second argument invalid: ${bResult.error}`); }
  return success(aResult.value + bResult.value);
}
console.log(JSON.stringify(sumIntFunctional("1", "1")))
console.log(JSON.stringify(sumIntFunctional("1.1", "1")))
console.log(JSON.stringify(sumIntFunctional("a", "b")))
```

---

#  Функциональные комбинаторы

```ts {monaco}
import { Result, success}  from "./preload.ts";
function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.success ? success(fn(result.value)) : result; }
function flatMapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> { return result.success ? fn(result.value) : result; }
function map2<T, U, V, E>(
  result1: Result<T, E>,
  result2: Result<U, E>,
  fn: (a: T, b: U) => V
): Result<V, E> {
  if (!result1.success) return result1;
  if (!result2.success) return result2;
  return success(fn(result1.value, result2.value)); }
```


---

# Идиоматичный  функциональный сумматор

```ts {monaco-run}
import { Result, ParseError, parseInteger, map2}  from "./preload.ts";
function sumIntPureFunctional(a: string, b: string): Result<number, ParseError> {
  return map2(
    parseInteger(a),
    parseInteger(b),
    (an, bn) => an + bn
  );
}
console.log(JSON.stringify(sumIntPureFunctional("1", "1")))
console.log(JSON.stringify(sumIntPureFunctional("1.1", "1")))
console.log(JSON.stringify(sumIntPureFunctional("a", "b")))
```

---

# Функциональные обертки

```ts {monaco}
import { Result, failure, success}  from "./preload.ts";
// Обертка для промисов, возвращающая Resu
async function resultify<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const value = await promise;
    return success(value);
  } catch (error) {
    return failure(error as E);
  } }
// Обертка для синхронных функций
function tryCatch<T, E = Error>(
  fn: () => T
): Result<T, E> {
  try {
    return success(fn());
  } catch (error) {
    return failure(error as E);
  } }
```

---

# Функциональный пример с промисами

```ts {monaco-run}
import { Result, mapResult, flatMapResultAsync, resultify, fetchUser, fetchUserPosts, User, Post }  from "./preload.ts";
async function fetchUserResult(id: number): Promise<Result<User>> {
  return resultify(fetchUser(id)); }
async function fetchUserPostsResult(userId: number): Promise<Result<Post[]>> {
  return resultify(fetchUserPosts(userId)); }
async function getUserWithPostsFlatMap(userId: number): Promise<Result<{
  user: User; posts: Post[]; }>> {
  const userResult = await fetchUserResult(userId);
  return flatMapResultAsync(userResult,
    async (user) => {
      const postsResult = await fetchUserPostsResult(user.id);
      return mapResult(
        postsResult,
        posts => ({ user, posts }) ); } ); }
async function main() { console.log(
  JSON.stringify(await getUserWithPostsFlatMap(0)))}
main()        
```

---

# Библиотека neverthrow

```ts {monaco-run}
import { Result, ok, err } from 'neverthrow';
type ParseError = 
  | { type: 'INVALID_NUMBER'; input: string }
  | { type: 'NOT_INTEGER'; input: string; value: number };
function parseInteger(input: string): Result<number, ParseError> {
  const num = Number(input);
  if (Number.isNaN(num)) { return err({ type: 'INVALID_NUMBER', input }); }
  if (num % 1 !== 0) { return err({ type: 'NOT_INTEGER', input, value: num }); }
  return ok(num); }
function sumIntWithCombine(a: string, b: string): Result<number, ParseError> {
  return Result.combine([parseInteger(a), parseInteger(b)])
    .map(([an, bn]) => an + bn);}
console.log(JSON.stringify(sumIntWithCombine("1", "1")))
console.log(JSON.stringify(sumIntWithCombine("1.1", "1")))
console.log(JSON.stringify(sumIntWithCombine("a", "b")))
```

---

# Библиотека neverthrow

```ts {monaco-run}
import { ResultAsync } from 'neverthrow';
import { fetchUser, fetchUserPosts, User, Post }  from "./preload.ts";
function fetchUserResult(id: number): ResultAsync<User, Error> {
  return ResultAsync.fromPromise(fetchUser(id), 
  (error) => new Error(`Failed to fetch user: ${error}`) ); }
function fetchUserPostsResult(userId: number): ResultAsync<Post[], Error> {
  return ResultAsync.fromPromise(fetchUserPosts(userId), 
  (error) => new Error(`Failed to fetch posts: ${error}`) ); }
function getUserWithPostsNeverthrow(userId: number): 
  ResultAsync<{ user: User; posts: Post[] }, Error> {
    return fetchUserResult(userId).andThen(user =>
      fetchUserPostsResult(user.id).map(posts => ({user, posts })) ); }
async function main() { console.log(
  JSON.stringify(await getUserWithPostsNeverthrow(1)))}
main() 
```

---

# Преимущества функционального подхода

- Явность ошибок — тип системы знает о возможных ошибках
- Безопасность — нельзя "забыть" обработать ошибку
- Композируемость — легко комбинировать с другими функциями
- Чистота — нет побочных эффектов, только преобразования
- Тестируемость — легко тестировать все сценарии