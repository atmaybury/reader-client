export const decodeToken = (tokenString: string) => {
  try {
    const [_, payload] = tokenString.split('.');
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("Couldn't decode JWT token: ", e);
    return null;
  }
};
