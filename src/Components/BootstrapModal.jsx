import { Modal } from "react-bootstrap";
import "./BootstrapModal.css";

function BootstrapModal({ title, body, ...props }) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                closeButton={props?.showclosebutton == "false" ? false : true}
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            {props.children}
        </Modal>
    );
}

export default BootstrapModal;
