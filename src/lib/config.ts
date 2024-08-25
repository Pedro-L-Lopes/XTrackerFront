// export const api: string = "https://localhost:7138";
export const api: string =
  "https://xtracker-g9f7hscca8gfhpc4.brazilsouth-01.azurewebsites.net";
// export const uploads: string = "http://localhost:5000/uploads";

export const requestConfig = (
  method: string,
  data: any,
  token: string | null = null,
  image: any = null
): RequestInit => {
  let config: RequestInit = {
    method,
    headers: {},
  };

  if (image) {
    (config as any).body = data;
  } else if (method !== "DELETE" && data !== null) {
    (config as any).body = JSON.stringify(data);
    (config.headers as any) = { "Content-Type": "application/json" };
  }

  if (token) {
    (config.headers as any) = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};
