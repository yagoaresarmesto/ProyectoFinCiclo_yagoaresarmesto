import { createContext } from "react";

const CartContext = createContext({
  productsCart: 0,
  addProductCart: () => null, //Funciones para añadir, recopilar, y borrar los productos del carrito
  getProductsCart: () => null,
  removeProductCart: () => null,
  removeAllProductsCart: () => null,
});

export default CartContext;


