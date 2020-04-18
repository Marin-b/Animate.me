
export const postApi = async(url, body = {}, headers = {}) => {
  return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        ...headers,
        'content-type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify(body)
  })
}

export const patchApi = async(url, body = {}, headers = {}) => {
  return fetch(url, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify(body)
  })
}
