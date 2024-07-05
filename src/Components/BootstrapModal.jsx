import { Modal } from "react-bootstrap";
import "./BootstrapModal.css";

function BootstrapModal(props) {
    return (
        <Modal
            {...props}
            // size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-70w"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
        </Modal>
    );
}

export default BootstrapModal;
