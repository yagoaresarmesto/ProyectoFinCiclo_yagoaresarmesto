import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import LayoutBasico from "../layouts/LayoutBasico";
import { getLastProductsApi } from "../api/product";
import ListaProductos from "../componentes/ListaProductos";
import Carrousel from "../componentes/Carrousel";
import Seo from "../componentes/Seo";


export default function Home() {
  const [products, setProducts] = useState(null);
  console.log(products);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(50);
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })();
  }, []);

  return (
    <LayoutBasico className="home">
      <Seo
      title="Home. Los mejores productos al mejor precio"
      />
      <Carrousel/>
     {!products && <Loader active>Cargando productos</Loader>}
      {products && size(products) === 0 && (
         <div>
         <h3>No hay productos en la tienda</h3>
       </div>
       )}
       {size(products) > 0 && <ListaProductos products={products} />}
    </LayoutBasico>

  );
}


