type Procedure = (...args: unknown[]) => void;

export function debounce<T extends Procedure>(func: T, delay: number) {
  let debounceTimeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}
