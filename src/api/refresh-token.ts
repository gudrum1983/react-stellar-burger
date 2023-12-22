import {BASE_URL, ENDPOINTS} from "../utils/config-api";

const url = (endpoint: string): string => `${BASE_URL}${endpoint}`;

const endpointsRefresh: string = ENDPOINTS.authToken;


type authToken = {
  "success": boolean;
  "accessToken": string;
  "refreshToken": string;
}



const checkResponseWithRefresh = <T>(res: Response):Promise<T> => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

const authToken = (): Promise<authToken> => {
  return fetch(url(endpointsRefresh), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponseWithRefresh<authToken>);
};

export const fetchWithRefresh =  async <T>(endpoint: string, options: RequestInit):Promise<T> => {
  try {
    const res = await fetch(url(endpoint), options);
    return await checkResponseWithRefresh<T>(res);
  } catch (err) {
    if (err && typeof err === 'object' && "message" in err) {
      if (err.message === "jwt expired") {
        const refreshData = await authToken();
        console.log()
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);

        // так как options у logout не содержит headers.authorization, а так же потому-что headers опциональное свойство
        // создадим новую константу и гарантируем что свойство
        // options.headers.authorization 100% будет в следующем запросе

        let newOptions: RequestInit = {
          ...options,
          headers: {
            ...options.headers,
            'authorization': refreshData.accessToken,
          },
        };

        const res = await fetch(`${BASE_URL}${endpoint}`, newOptions);
        return await checkResponseWithRefresh<T>(res);
      } else {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(err);
    }
  }
};