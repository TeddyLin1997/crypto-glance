type ApiService<T, U = string> = Promise<
  | { isError: false; value: T }
  | { isError: true; value: U }
>;
