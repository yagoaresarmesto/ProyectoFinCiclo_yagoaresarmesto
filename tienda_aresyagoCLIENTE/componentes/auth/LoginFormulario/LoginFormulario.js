import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user"

export default function LoginFormulario(props) {
    const { showRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false)
    const { login } = useAuth();


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => { //Pasamos los datos introducidos
            setLoading(true)
            const response = await loginApi(formData);
            if (response?.jwt) { //Si el login funciona
                login(response.jwt);
                onCloseModal();
            } else { //Si no funciona
                toast.error("El email o la contraseña no son válidas")
            }
            setLoading(false);

        },
    });


    const resetPassword = () => { //Resetar contraseña
        formik.setErrors({}); //Reiniciar todos los errores del formulario
        const validateEmail = Yup.string().email().required(); 

        if (!validateEmail.isValidSync(formik.values.identifier)) { //Si la validación sale false
            formik.setErrors({ identifier: true }); //Email válido
        } else {
            resetPasswordApi(formik.values.identifier); //No válido
        }
    };

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="identifier"
                type="text"
                placeholder="Correo electrónico"
                onChange={formik.handleChange}
                error={formik.errors.identifier}
            />

            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <div className="actions">
                <Button type="button" basic onClick={showRegisterForm}>
                    Registrarse
        </Button>
                <div>
                    <Button className="submit" type="submit" loading={loading}>
                        Entrar
          </Button>

                    <Button type="button" onClick={resetPassword}>¿Has olvidado la contraseña?</Button>
                </div>
            </div>
        </Form>
    );
}


function initialValues() {
    return {
        indentifier: "",
        password: "",
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }

}