import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";



export default function ListaProductos(props) {
    const { products } = props;

    return (
        
        <div className="list-games">
            <Grid>
                <Grid.Row columns={5}>
                    {map(products, (product) => (
                        <Product product={product} />
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    )

}

function Product(props) {
    const { product } = props;

    return (
        <Grid.Column className="producto">
            <Link href={`/${product.url}`}>
                <a>
                    <Image src={product.poster.url}
                    alt={product.title} className="producto__detalles-imagen" />
                    <div className="producto'__detalles">
                        <h4 className="encabezado--centrado">{product.title}</h4>
                       
                        <div className="precio-decuento">
                            <p className="descuento">-{product.discount}%</p>
                            <p className="precio">{product.price}€</p>
                        </div>
                      
                    </div>
                </a>
            </Link>
        </Grid.Column>
    );
}