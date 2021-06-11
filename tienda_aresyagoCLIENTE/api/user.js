import { BASE_PATH } from "../utils/constants"
import { authFetch } from "../utils/fetch";

export async function registerApi(formData) { //Función que recibe los datos del formulario y los registra en strapi
    try {
        const url = `${BASE_PATH}/auth/local/register`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result; //Para que los datos se vayan al formulario de registro
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function loginApi(formData) { //Para el login
    try {
      const url = `${BASE_PATH}/auth/local`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function resetPasswordApi(email) { //Resetear contraseña
    try {
      const url = `${BASE_PATH}/auth/forgot-password`; //El path strapi
      const params = {
        method: "POST", //Tipo POST porque lo dice strapi
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), //Lo pasamos en objeto
      };
      const response = await fetch(url, params);
      const result = await response.json(); 
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function getMeApi(logout) { //Recibe la función logout
    try {
      const url = `${BASE_PATH}/users/me`; //El path de strapi
      const result = await authFetch(url, null, logout);
      return result ? result : null;
    } catch (error) {
      return null;
    }
  }


  export async function updateNameApi(idUser, data, logout) { //Actualizar Nombre
    try {
      const url = `${BASE_PATH}/users/${idUser}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const result = await authFetch(url, params, logout);
      return result ? result : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  export async function updateEmailApi(idUser, email, logout) { //Actualizar Email
    try {
      const url = `${BASE_PATH}/users/${idUser}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      };
      const result = await authFetch(url, params, logout);
      return result ? result : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  export async function updatePasswordApi(idUser, password, logout) { //Actualizar Contraseña
    try {
      const url = `${BASE_PATH}/users/${idUser}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      };
      const result = await authFetch(url, params, logout);
      return result ? result : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  