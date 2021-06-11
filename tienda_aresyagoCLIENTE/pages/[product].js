import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutBasico from "../layouts/LayoutBasico";
import {getProductByUrlApi} from "../api/product";
import EncabezadoProducto from "../componentes/Producto/EncabezadoProducto";
import TabsProduct from "../componentes/Producto/TabsProduct";
import Seo from "../componentes/Seo";

export default function Product() {
    const [product, setProduct] = useState(null);
    const { query } = useRouter();


    useEffect(() => {
        (async () => {
            const response = await getProductByUrlApi(query.product);
            setProduct(response);
        })();
    }, [query]);

    if (!product) return null;

    return (
        <LayoutBasico className="game">
            <Seo
            title={product.title}
            />
            <EncabezadoProducto product={product}/>
            <TabsProduct product={product}/>
        </LayoutBasico>
    )
}