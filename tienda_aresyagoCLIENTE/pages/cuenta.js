import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import LayoutBasico from "../layouts/LayoutBasico";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import CambiarNombreFormulario from "../componentes/Cuenta/CambiarNombreFormulario/CambiarNombreFormulario";
import CambiarEmailFormulario from "../componentes/Cuenta/CambiarEmailFormulario";
import CambiarContraseñaFormulario from "../componentes/Cuenta/CambiarContraseñaFormulario";
import ModalBasico from "../componentes/modal/ModalBasico"
import DireccionesFormulario from "../componentes/Cuenta/DireccionesFormulario";
import ListaDirecciones from "../componentes/Cuenta/ListaDirecciones";

export default function cuenta() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout); //Función para obtener los datos del usaurio
            setUser(response || null);
        })();
    }, [auth]); //Y esto siempre se usa cuando se cambia de usuario

    if (user === undefined) return null;
    if (!auth && !user) { //Quiere decir que si el usuario no esta logeado y intenta entrar a esta página lo va a redireccionar a la home
        router.replace("/");
        return null;
    }

    return (
        <LayoutBasico className="cuenta">
            <Configuracion user={user} logout={logout} setReloadUser={setReloadUser} />
        </LayoutBasico>

    )
}

function Configuracion(props) {
    const { user, logout, setReloadUser } = props;

    return (
        <div className="cuenta__configuracion">
            <div className="titulo">Configuración </div>
            <div className="data">
                <CambiarNombreFormulario user={user} logout={logout} setReloadUser={setReloadUser} />

                <CambiarEmailFormulario user={user} logout={logout} setReloadUser={setReloadUser} />
                <CambiarContraseñaFormulario user={user} logout={logout} />
                <Addresses />
            </div>
        </div>
    )
}



function Addresses() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);
    const [reloadAddreses, setReloadAddreses] = useState(false);
  
    const openModal = (title, address) => {
      setTitleModal(title);
      setFormModal(
        <DireccionesFormulario
          setShowModal={setShowModal}
          setReloadAddreses={setReloadAddreses}
          newAddress={address ? false : true}
          address={address || null}
        />
      );
      setShowModal(true);
    };
  
    return (
      <div className="cuenta__addresses">
        <div className="titulo">
          Direcciones
          <Icon name="plus" link onClick={() => openModal("Nueva dirección")} />
        </div>
        <div className="data">
          <ListaDirecciones
            reloadAddreses={reloadAddreses}
            setReloadAddreses={setReloadAddreses}
            openModal={openModal}
          />
        </div>
  
        <ModalBasico show={showModal} setShow={setShowModal} title={titleModal}>
          {formModal}
        </ModalBasico>
      </div>
    );
  }
  
