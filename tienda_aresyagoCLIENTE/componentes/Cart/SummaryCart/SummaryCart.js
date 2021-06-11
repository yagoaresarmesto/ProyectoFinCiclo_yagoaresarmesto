import React, { useState, useEffect } from "react";
import { Image, Icon, Table } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
    const { products, reloadCart, setReloadCart } = props;
    const [totalPrice, setTotalPrice] = useState(0); // Para que sume los precios
    const { removeProductCart } = useCart();

    useEffect(() => {
        let price = 0;
        forEach(products, (product) => {
          price += product.price;
        });
        setTotalPrice(price);
      }, [reloadCart, products]);

      const removeProduct = (product) => {
        removeProductCart(product);
       setReloadCart(true);
      };
    
    return (
        <div className="resumen-carrito">
            <div className="titulo">Resumen del carrito</div>

            <div className="data">
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="resumen-carrito__encabezado">Producto</Table.HeaderCell>
                            <Table.HeaderCell className="resumen-carrito__encabezado">Categoría</Table.HeaderCell>
                            <Table.HeaderCell className="resumen-carrito__encabezado">Entrega</Table.HeaderCell>
                            <Table.HeaderCell className="resumen-carrito__encabezado">Precio</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {map(products, (product) => (
                            <Table.Row key={product.id} className="resumen-carrito__producto">
                                <Table.Cell>
                                    <Icon
                                        name="close"
                                        link
                                        onClick={() => removeProduct(product.url)}
                                    />
                                    <Image src={product.poster.url} alt={product.title} />
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell>{product.category.title}</Table.Cell>
                                <Table.Cell>24/48h</Table.Cell>
                                <Table.Cell>{product.price} €</Table.Cell>
                            </Table.Row>
                        ))}
                        <Table.Row className="resumen-carrito__resumen">
                            <Table.Cell className="clear" />
                            <Table.Cell colSpan="2">Total:</Table.Cell>
                            <Table.Cell className="total-precio">
                                {totalPrice.toFixed(2)} €
              </Table.Cell>
                        </Table.Row>

                    </Table.Body>

                </Table>
            </div>
        </div>
    );
}
