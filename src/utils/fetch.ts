export const fetchApi = async <T>(
  url: string,
  config: FetchApiConfig
): Promise<T> => {
  let generateUrl = `${config.baseurl}${url}`;
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

export enum BaseUrl {
  Scryfall = "https://api.scryfall.com/",
  Groq = " https://mtg-card-recommender-backend.netlify.app/",
}

export type FetchApiConfig = {
  baseurl?: BaseUrl;
  body?: BodyInit;
  query?: Record<string, string>;
  cardType?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};
