export function search() {
  return fetch('url')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error" + response.status)
      }
      return response.json()
    })
    .then(json => {
      console.log(json)
    })
}
