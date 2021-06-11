import { createContext } from "react";

const AuthContext = createContext({ //Donde guardaremos el contexto de nuestro usuario
  auth: undefined, //Datos de usuario
  login: () => null, //Guarda nuestro tokem en el localstorage
  logout: () => null, //Para delogear desde cualquier parte de nuestra aplicación
  setReloadUser: () => null, //Recargar
});

export default AuthContext;