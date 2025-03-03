export const fetchApi = async <T>(
  url: string,
  config: FetchApiConfig
): Promise<T> => {
  let generateUrl = `https://api.scryfall.com/${url}`;
  if (config.query) {
    generateUrl = `${generateUrl}?${new URLSearchParams(
      config.query
    ).toString()}`;
  }
  if (config.cardType) {
    generateUrl = `${generateUrl}+type:"${config.cardType}"`;
  }
  const response = await fetch(generateUrl, {
    body: config.body,
    method: config.method,
    headers: { "Content-Type": "application/json" },
  });
  const data: T = await response.json();
  return data;
};

export type FetchApiConfig = {
  body?: BodyInit;
  query?: Record<string, string>;
  cardType?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};
