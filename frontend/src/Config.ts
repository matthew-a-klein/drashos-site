interface Urls {
  API_BASE_URL: string;
}

interface Config {
  urls: Urls;
}

const prod: Config = {
  urls: {
    API_BASE_URL: "/",
  },
};

const dev: Config = {
  urls: {
    API_BASE_URL: "http://127.0.0.1:8000/",
  },
};

export const config: Config =
  process.env.NODE_ENV === "development" ? dev : prod;
