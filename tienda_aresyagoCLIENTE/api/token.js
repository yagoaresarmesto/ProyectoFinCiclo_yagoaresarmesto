import { TOKEN } from "../utils/constants"; //iMPORTAMOS LA CONSTANTE tokem
import jwtDecode from "jwt-decode";

export function setToken(token) { //Guardar el token en el localStorage
  localStorage.setItem(TOKEN, token);
}

export function getToken() { //Función que recupera el token del localstorage
  return localStorage.getItem(TOKEN);
}

export function removeToken() { //Para eliminar el token, cerrar sesión
  localStorage.removeItem(TOKEN);
}

export function hasExpiredToken(token) { //Para comporbar si ha expirado el token
  const tokenDecode = jwtDecode(token); //Token decodificado
  const expireDate = tokenDecode.exp * 1000; //Lo multiplacmos x1000 para pasarlo a segundos
  const currentDate = new Date().getTime(); //Para sacar la fecha actual
  if (currentDate > expireDate) { 
    return true;
  }
  return false;
}
