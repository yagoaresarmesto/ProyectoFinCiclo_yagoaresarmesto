import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from "../../../api/favorite";
import useCart from "../../../hooks/useCart";
export default function EncabezadoProducto(props) {
    const { product } = props;
    const { poster, title } = product;


    return (
        <Grid className="header-game">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={poster.url} alt={title} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info product={product} />
            </Grid.Column>
        </Grid>

    )
}

function Info(props) {

    const { product } = props
    const { title, summary, price, discount, url } = product;
    const [isFavorite, setIsFavorite] = useState(false);
    const [realoadFavorite, setRealoadFavorite] = useState(false);
    const { auth, logout } = useAuth();
    const { addProductCart } = useCart();


    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth.idUser, product.id, logout);
            if (size(response) > 0) setIsFavorite(true);
            else setIsFavorite(false);
        })();
        setRealoadFavorite(false);
    }, [product, realoadFavorite]);


    const addFavorite = async () => {
        if (auth) {
            await addFavoriteApi(auth.idUser, product.id, logout);
            setRealoadFavorite(true);
        }
    };


    const deleteFavorite = async () => {
        if (auth) {
            await deleteFavoriteApi(auth.idUser, product.id, logout);
            setRealoadFavorite(true);
        }
    };

    return (
        <>
            <div className="header-game__title">
                {title}
                <Icon name={isFavorite ? "heart" : "heart outline"} className={classNames({
                    like: isFavorite,
                })}
                    link
                    onClick={isFavorite ? deleteFavorite : addFavorite}
                />
            </div>
            <div className="header-game__delivery">Entrega en 24/48h</div>
            <div
                className="header-game__summary"
                dangerouslySetInnerHTML={{ __html: summary }} //Para que en caso de que escriba html en la descripción que lo traduzca
            />

            <div className="header-game__buy">
                <div className="header-game__buy-price">
                    <p>Precio de venta: {price}€</p>
                    <div className="header-game__buy-price-actions">
                        <p>-{discount}%</p>
                        <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}€</p>
                    </div>
                </div>

                <Button className="header-game__buy-btn" onClick={() => addProductCart(url)}>
                    Comprar
        </Button>
            </div>

        </>
    )
}