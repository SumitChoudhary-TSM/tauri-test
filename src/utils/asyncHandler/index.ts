export const asyncHandler = async <T>(promise: Promise<T>): Promise<[T | undefined, unknown]> => {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (error: unknown) {
    return [undefined, error];
  }
};
