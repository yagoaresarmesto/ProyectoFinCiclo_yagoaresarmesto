import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
  const token = getToken(); //Obtener token

  if (!token) {
    //Usuario no logeado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //Token caducado
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`, //Es un estandar de strapi, no se exactamente que hace
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
