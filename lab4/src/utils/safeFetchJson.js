export function safeFetchJson(url, options) {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}
