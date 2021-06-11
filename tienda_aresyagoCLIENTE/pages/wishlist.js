import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import LayoutBasico from "../layouts/LayoutBasico";
import { getFavoriteApi} from "../api/favorite";
import useAuth from "../hooks/useAuth";
import ListaProductos from "../componentes/ListaProductos";

export default function wishlist() {
  const [products, setProducts] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const productsList = [];
        forEach(response, (data) => {
          productsList.push(data.product);
        });
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    })();
  }, []);

  return (
    <LayoutBasico className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de desesos</div>

        <div className="data">
          {!products && <Loader active>Cargando juegos</Loader>}
          {products && size(products) === 0 && (
            <div className="data__not-found">
              <h3>No tienes ingun juego en tu lista</h3>
            </div>
          )}
        {size(products) > 0 && <ListaProductos products={products} />} 
        </div>
      </div>
    </LayoutBasico>
  );
 }