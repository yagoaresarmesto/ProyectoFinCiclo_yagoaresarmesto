import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import LayoutBasico from "../../layouts/LayoutBasico";
import { getProductCategoryApi, getTotalProductsCategoryApi } from "../../api/product";
import ListaProductos from "../../componentes/ListaProductos";
import Pagination from "../../componentes/Paginación";

const limitPerPage = 10;

export default function Category() { //Funcón para mostrar los productos de cada categoría
    const { query } = useRouter();
    const [products, setProducts] = useState(null);
    const [totalProducts, setTotaProducts] = useState(null);


    const getStartItem = () => { //Para ver de que item vamos a empezar
        const currentPages = parseInt(query.page);
        if (!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage; //Esto sabremos por ite, tendrá que empzar dependiendo de la página
    };

    useEffect(() => {
        (async () => {
            if (query.category) {
                const response = await getProductCategoryApi(
                    query.category,
                    limitPerPage,
                    getStartItem()
                );
                setProducts(response);
            }
        })();
    }, [query]);


    useEffect(() => {
        (async () => {
            const response = await getTotalProductsCategoryApi(query.category);
            setTotaProducts(response)
        })();
    }, [query]);


    return (
        <LayoutBasico>
            {!products && <Loader active>Cargando productos</Loader>}
            {products && size(products) === 0 && (
                <div>
                    <h3>No hay productos disponibles</h3>
                </div>
            )}
            {size(products) > 0 && <ListaProductos products={products} />}

            {totalProducts ? (
                <Pagination
                    totalProducts={totalProducts} //Total de productos encontrados
                    page={query.page ? parseInt(query.page) : 1} //Página actual
                    limitPerPage={limitPerPage}
                />
            ) : null}

        </LayoutBasico>

    )
}