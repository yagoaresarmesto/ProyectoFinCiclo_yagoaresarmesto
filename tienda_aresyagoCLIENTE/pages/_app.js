//Todas las importaciones de manera global de nuestra aplicación.
import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from "react-toastify"; //Es un paquete que sirve para mostrar errores, operaciones con éxito...
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext"; //El authContext
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import { getProductsCart, addProductCart, countProductsCart, removeProductCart, removeAllProductsCart } from "../api/cart";
import "../scss/global.scss"; //SCSS global
import 'semantic-ui-css/semantic.min.css'; //Semantic
import 'react-toastify/dist/ReactToastify.css'; //Estilos de toastify
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [realoadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter(); //Rutas

  useEffect(() => { //Que se ejecuta cuando carga la aplicación
    const token = getToken(); //Obtiene el token del localstorage
    if (token) { //Comprobamos si el token existe
      setAuth({ //Setea nuestro token
        token,
        idUser: jwtDecode(token).id,
      });
    } else { //Si no existe...
      setAuth(null);
    }
    setReloadUser(false);
  }, [realoadUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => { //Función que se va a encargar de hacer el login, es decir guardar los datos en el localstorage y de decodificar el tokem y mandarlo a authData 
    setToken(token); //Setear el token cuando se refreshe la página
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  }

  const logout = () => { //Cerrar sesión
    if (auth) {
      removeToken(); //Borramos token
      setAuth(null); //Seteamos los datos del usario que tenía
      router.push("/"); //Y lo llevamos a la home
    }
  };

  const authData = useMemo( //Objeto auth data donde guradamos los datos del usuario
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un producto tienes que iniciar sesión");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };


  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );


  if (auth === undefined) return null; //Si auth no esta definido es porque nuestra aplicaicón esta comporbando si el usuario está logeado o no

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}


