import { Modal, Icon } from "semantic-ui-react";


//Este es el modal basico que se va a mostrar en el menú

export default function BasicModal(props) {
    const { show, setShow, title, children, ...rest } = props; //Para ver, ocultar, título del modal, children, el contenido del modal y los otros props que el usuario quiera darle
    const onClose = () => setShow(false);
    return (
        <Modal className="basic-modal"
            open={show}
            onClose={onClose}
            {...rest}
            >
            
            <Modal.Header>
                <span>{title}</span> <Icon name="window close outline" onClick={onClose} />
            </Modal.Header>
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    );
}