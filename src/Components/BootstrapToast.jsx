import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function BootstrapToast({ toast }) {
    return (
        toast.show && (
            <ToastContainer
                className="p-3"
                position="bottom-start"
                style={{ zIndex: 1 }}
            >
                <Toast
                    className="d-inline-block m-1"
                    bg="success"
                    onClose={() => setShow(false)}
                    show={toast.show}
                    delay={3000}
                    autohide
                    animation={true}
                >
                    <Toast.Header closeButton={true}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        )
    );
}
