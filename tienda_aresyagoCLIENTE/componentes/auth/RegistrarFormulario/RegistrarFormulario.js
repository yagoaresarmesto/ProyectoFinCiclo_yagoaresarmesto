import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"; //Para manejar estados, errores en nuestro formulario...
import * as Yup from "yup"; //Para validar formularios
import {toast} from "react-toastify"
import {registerApi} from "../../../api/user";

export default function RegistrarFormulario(props) {
    const { showLoginForm } = props;
    const [loading, setLoading] = useState(false); //Spinner

    const formik = useFormik({
        initialValues: initialValues(), //Los valores iniciales de nuestro formulario, lo puse abajo como función para que quuede más limpio
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true); //Cuando empiece que gire el spinner
           const response = await registerApi(formData);
           if(response?.jwt) {
               toast.success("Registro con éxito.")
               showLoginForm();
           } else {
               toast.error("Error al registrar el usuario. Inténtalo más tarde")
           }
            setLoading(false); //Cuando termine de registrar que pare el spinner
        }
    });
    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="name"
                type="text"
                placeholder="Nombre"
                onChange={formik.handleChange}
                error={formik.errors.name}
            />

            <Form.Input
                name="lastname"
                type="text" placeholder="Apellidos"
                onChange={formik.handleChange}
                error={formik.errors.lastname}
            />

            <Form.Input
                name="username" type="text"
                placeholder="Nombre de usuario"
                onChange={formik.handleChange}
                error={formik.errors.username}
            />

            <Form.Input
                name="email" type="text"
                placeholder="Correo electrónico"
                onChange={formik.handleChange}
                error={formik.errors.email}
            /> {/*Va a ser tipo texto, no tipo email al final*/}

            <Form.Input name="password"
                type="password"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <div className="actions">
                <Button type="button" basic onClick={showLoginForm}> 
                    Iniciar sesión
                </Button>

                <Button type="submit" className="submit" loading={loading}>
                    Registrar
                </Button>
            </div>
        </Form>
    );
}

function initialValues() { //Valores iniciales
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    }
}

function validationSchema() { //Validaciones
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}