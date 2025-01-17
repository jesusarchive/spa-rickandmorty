type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

const defaultOptions = {};

function get(url: string, options: RequestOptions = {}) {
  const { headers = {}, params = {} } = options;
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return fetch(fullUrl, {
    method: "GET",
    headers: { ...defaultHeaders, ...headers },
    ...defaultOptions,
  });
}

function post(url: string, options: RequestOptions = {}) {
  const { headers = {}, body } = options;

  return fetch(url, {
    method: "POST",
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...defaultOptions,
  });
}

function put(url: string, options: RequestOptions = {}) {
  const { headers = {}, body } = options;

  return fetch(url, {
    method: "PUT",
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...defaultOptions,
  });
}

function patch(url: string, options: RequestOptions = {}) {
  const { headers = {}, body } = options;

  return fetch(url, {
    method: "PATCH",
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...defaultOptions,
  });
}

function del(url: string, options: RequestOptions = {}) {
  const { headers = {} } = options;

  return fetch(url, {
    method: "DELETE",
    headers: { ...defaultHeaders, ...headers },
    ...defaultOptions,
  });
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
