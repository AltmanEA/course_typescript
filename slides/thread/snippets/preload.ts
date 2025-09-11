export function sumInt(a: string, b: string): number {
  return Number(BigInt(a) + BigInt(b))
}

export interface User {
  id: number;
  name: string;
}

export interface Post {
  userId: number;
  title: string;
}

export function fetchUser(id: number): Promise<User> {
  return Promise.resolve({ id, name: `User ${id}` });
}

export const fetchUserData = (id: number): Promise<User> =>
  Promise.resolve({ id, name: `User ${id}` });

export const fetchUserSettings = (id: number): Promise<{ theme: string }> =>
  Promise.resolve({ theme: "dark" });

export function fetchUserPosts(userId: number): Promise<Post[]> {
  return Promise.resolve([
    { userId, title: "Post 1" },
    { userId, title: "Post 2" }
  ]);
}

export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };
export function success<T>(value: T): Result<T> {
  return { success: true, value };
}
export function failure<E = Error>(error: E): Result<never, E> {
  return { success: false, error };
}

export type ParseError =
  | 'INVALID_NUMBER'
  | 'NOT_INTEGER'
  | 'NEGATIVE_NUMBER'; // добавим для примера

// Функция для валидации целого числа
export function parseInteger(str: string): Result<number, ParseError> {
  const num = Number(str);

  if (Number.isNaN(num)) {
    return failure('INVALID_NUMBER');
  }

  if (num % 1 !== 0) {
    return failure('NOT_INTEGER');
  }

  // Дополнительная валидация (опционально)
  if (num < 0) {
    return failure('NEGATIVE_NUMBER');
  }

  return success(num) as Result<number, ParseError>;
}

export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.success ? success(fn(result.value)) : result;
}
export function flatMapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> { return result.success ? fn(result.value) : result; }
export function map2<T, U, V, E>(
  result1: Result<T, E>,
  result2: Result<U, E>,
  fn: (a: T, b: U) => V
): Result<V, E> {
  if (!result1.success) return result1;
  if (!result2.success) return result2;
  return success(fn(result1.value, result2.value));
}

// Обертка для промисов, возвращающая Result
export async function resultify<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const value = await promise;
    return success(value);
  } catch (error) {
    return failure(error as E);
  }
}

// Обертка для синхронных функций
export function tryCatch<T, E = Error>(
  fn: () => T
): Result<T, E> {
  try {
    return success(fn());
  } catch (error) {
    return failure(error as E);
  }
}

export async function flatMapResultAsync<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Promise<Result<U, E>>
): Promise<Result<U, E>> {
  if (!result.success) {
    return result; // Пробрасываем ошибку
  }
  
  try {
    return await fn(result.value);
  } catch (error) {
    return failure(error as E);
  }
}