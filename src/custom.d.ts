declare global {
  interface Window {
    ENV_CONFIG: {
      API_URL: string;
    };
  }
}

export {}; // Makes this a module
