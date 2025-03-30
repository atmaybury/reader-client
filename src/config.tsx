const LOCAL = import.meta.env.VITE_LOCAL === 'true';

console.log('ENV_CONFIG exists:', Boolean(window.ENV_CONFIG));
console.log('ENV_CONFIG contents:', window.ENV_CONFIG);

const BASE_API_PATH = LOCAL
  ? import.meta.env.VITE_API_URL
  : window.ENV_CONFIG?.API_URL;

const API_PORT = LOCAL ? 8080 : 80;
const API_PATH = `${BASE_API_PATH}:${API_PORT}`;

console.table({
  LOCAL,
  API_PATH,
});

export default {
  LOCAL,
  API_PATH,
};
