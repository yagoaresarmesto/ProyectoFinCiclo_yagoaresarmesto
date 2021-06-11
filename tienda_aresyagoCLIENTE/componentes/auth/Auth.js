//Esta es la parte de autentificación del usuario
import React, { useState } from "react";
import LoginFormulario from "./LoginFormulario"; //Login formulario
import RegistrarFormulario from "./RegistrarFormulario"; //Registro formulario

export default function Auth(props) {
    const { onCloseModal, setTitleModal } = props;
    const [showLogin, setShowLogin] = useState(true);

    const showLoginForm = () =>{ 
        setTitleModal("Inicia sesión")
        setShowLogin(true)
    }; //Función para mostrar el formulario de login
    const showRegisterForm = () => {
        setTitleModal("Crear nuevo usuario")
        setShowLogin(false)
    }; //Función para mostrar el formulario de registro
   
    return showLogin ? <LoginFormulario showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} /> //Y cerramos el modal cuando el usuario se logea
     : 
     <RegistrarFormulario showLoginForm={showLoginForm}/>;
}
