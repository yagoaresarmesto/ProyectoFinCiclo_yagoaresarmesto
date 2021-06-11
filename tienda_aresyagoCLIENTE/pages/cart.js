import React, { useState, useEffect } from "react";
import LayoutBasico from "../layouts/LayoutBasico";
import { getProductByUrlApi } from "../api/product";
import useCart from "../hooks/useCart";
import SummaryCart from "../componentes/Cart/SummaryCart";
import AddressShipping from "../componentes/Cart/AddressShipping";
import Payment from "../componentes/Cart/Payment";

export default function Cart() {
    const { getProductsCart } = useCart();
    const products = getProductsCart();

    return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
    return (
        <LayoutBasico className="empty-cart">
            <h2>No hay productos en el carrito</h2>
        </LayoutBasico>
    );
}


function FullCart(props) {
    const { products } = props;
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        (async () => {
            const productsTemp = [];
            for await (const product of products) { //Un for async 
                const data = await getProductByUrlApi(product);
                productsTemp.push(data);
            }
            setProductsData(productsTemp);
        })();
        setReloadCart(false);
    }, [reloadCart]);

    return (
        <LayoutBasico className="empty-cart">
            <SummaryCart products={productsData}
                reloadCart={reloadCart}
                reloadCart={reloadCart}
                setReloadCart={setReloadCart} />

            <AddressShipping setAddress={setAddress} />
            {address && <Payment products={productsData} address={address} />}
        </LayoutBasico>
    )
}