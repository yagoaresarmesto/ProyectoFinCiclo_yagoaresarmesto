import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import ModalBasico from "../../modal/ModalBasico"; //Nos traemos el modal básico
import Auth from "../../auth" //Importamos la autentificación del usuario
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getCategoriesApi } from "../../../api/categories";

export default function menuWeb() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("Inicia sesión");
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();

    useEffect(() => { //Función que se autollama
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })();
    }, [auth]);

    useEffect(() => {
        (async () => {
            const response = await getCategoriesApi();
            setCategories(response || []);
        })();
    }, []);


    const onShowModal = () => setShowModal(true); //Una función en flecha que hace setModal = true
    const onCloseModal = () => setShowModal(false);
    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__derecha" width={6}>
                        <MenuSecciones categories={categories} />
                    </Grid.Column>
                    <Grid.Column className="menu__izquierda" width={10}>
                        {user !== undefined && (
                            <MenuOpciones onShowModal={onShowModal}
                                user={user}
                                logout={logout}
                            />
                        )}

                    </Grid.Column>
                </Grid>
            </Container>

            <ModalBasico
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
                size="small"
            >
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
            </ModalBasico>
        </div>
    );
}




function MenuSecciones(props) {
    const { categories } = props;

    return (
        <Menu>
            {map(categories, (category) => (
                <Link href={`/products/${category.url}`} key={category._id}>
                    <Menu.Item as="a" name={category.url}>
                        {category.title}
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    );
}
// as="a" hacemos que se comporte como un link


function MenuOpciones(props) {
    const { onShowModal, user, logout } = props;
    const { productsCart } = useCart();
    return (
        <Menu>
            {user ? (
                <>
                    <Link href="/orders">
                        <Menu.Item as="a">
                            <Icon name="clipboard outline" />
                 Mis Pedidos
                </Menu.Item>
                    </Link>

                    <Link href="/wishlist">
                        <Menu.Item as="a">
                            <Icon name="smile outline" />
                Favoritos
                </Menu.Item>
                    </Link>

                    <Link href="/cuenta">
                        <Menu.Item as="a">
                            <Icon name="user outline" />
                            {user.name} {user.lastname} {/*Nombre y apellidos del usuario logeado*/}
                        </Menu.Item>
                    </Link>

                    <Link href="/cart" className="m-0">
                        <Menu.Item as="a">
                            <Icon name="add to cart" />
                            {productsCart > 0 && (
                            <Label color="red" floating circular>
                              {productsCart}  
                            </Label>
                            )}
                        </Menu.Item>
                    </Link>

                    <Menu.Item className="m-0" onClick={logout}>
                        <Icon name="sign-out" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item onClick={onShowModal}>
                    <Icon name="user outline" />
          Mi cuenta
                </Menu.Item>
            )}
        </Menu>
    )
}