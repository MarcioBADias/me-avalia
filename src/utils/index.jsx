const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const request = ({ url, onSuccess, onFinally }) => {
  fetch(url)
    .then((r) => r.json())
    .then(onSuccess)
    .catch(console.log)
    .finally(onFinally)
}

export { baseUrl, request }
