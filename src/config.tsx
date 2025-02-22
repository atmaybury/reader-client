const LOCAL = import.meta.env.VITE_LOCAL === 'true'

const BASE_API_PATH = LOCAL ? "http://localhost" : "https://reader-api-7bx9.onrender.com"
const API_PORT = LOCAL ? 8080 : 80
const API_PATH = `${BASE_API_PATH}:${API_PORT}`

export default {
  LOCAL,
  API_PATH
}
