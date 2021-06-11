import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import LayoutBasico from "../layouts/LayoutBasico";
import { searchProductsApi } from "../api/product";
import ListaProductos from "../componentes/ListaProductos";
import Seo from "../componentes/Seo";

export default function search() {
  const [products, setProducts] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-product").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchProductsApi(query.query);
        if (size(response) > 0) setProducts(response);
        else setProducts([]);
      } else {
        setProducts([]);
      }
    })();
  }, [query]);

  return (
    <LayoutBasico className="search">
      <Seo
      title={`Buscando: ${query.query}`}

      />
      {!products && <Loader active>Buscando juegos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No se han encontrado juegos</h3>
        </div>
      )}
      {size(products) > 0 && <ListaProductos products={products} />}
    </LayoutBasico>
  );
}
