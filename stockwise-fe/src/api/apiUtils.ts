export const convertToSearchParams = <T extends { [name: string]: unknown }>(payload: T): URLSearchParams => {
  const searchParams: Record<string, string> = Object.entries(payload).reduce(
    (currentSearchParams: Record<string, string>, [key, value]) => {
      const updatedParams = { ...currentSearchParams };
      updatedParams[key] = String(value);
      return updatedParams;
    },
    {}
  );

  return new URLSearchParams(searchParams);
};

export const buildUrlQueryParams = <T>(url: string, params?: T): string => {
  if (params) {
    const queryParams = convertToSearchParams(params);
    return `${url}?${queryParams.toString()}`;
  }

  return url;
};
