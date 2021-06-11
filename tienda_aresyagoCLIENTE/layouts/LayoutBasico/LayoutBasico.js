import { Container } from "semantic-ui-react"; //Este contenedor es lo que va a envolver todo el layout y es de semantic-iu
import classNames from "classnames"
import Encabezado from "../../componentes/encabezado";

export default function LayoutBasico(props) {
    const { children, className } = props; //Para renderizar lo que se encuentra dentro del componente

    return (
        <Container 
            fluid
            className={classNames("layout-basico", {
                [className]: className,
            })}
        >  {/* Fluid es una propiedad que tiene semantic-iu, y sirve para que ocupe todo el ancho de la pantalla */}
            <Encabezado />
            <Container className="contenido">{children}</Container>
        </Container>
    );
}

