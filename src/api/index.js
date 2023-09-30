function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject('Ошибка подключения к серверу');
}

export function request(baseUrl, endpointText, options) {
  return fetch(`${baseUrl}${endpointText}`, options).then(checkResponse)
}