// útil de retray por si se necesita utilizar con más funciones

export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 5,
  baseDelay = 1000
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt += 1;
      if (attempt >= maxAttempts) {
        throw err;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, baseDelay * attempt)
      );
    }
  }
}
