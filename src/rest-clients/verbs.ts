type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

const defaultOptions = {};

async function makeRequest(
  method: string,
  url: string,
  options: RequestOptions = {}
) {
  const { headers = {}, params = {}, body } = options;
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetch(fullUrl, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...defaultOptions,
  });

  if (!response.ok) {
    throw new Error(`Unknown Error`);
  }

  return response;
}

async function get(url: string, options: RequestOptions = {}) {
  return makeRequest("GET", url, options);
}

async function post(url: string, options: RequestOptions = {}) {
  return makeRequest("POST", url, options);
}

async function put(url: string, options: RequestOptions = {}) {
  return makeRequest("PUT", url, options);
}

async function patch(url: string, options: RequestOptions = {}) {
  return makeRequest("PATCH", url, options);
}

async function del(url: string, options: RequestOptions = {}) {
  return makeRequest("DELETE", url, options);
}

export default function getVerbs() {
  return {
    get,
    post,
    put,
    patch,
    del,
  };
}
