import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function PageHeader(props) {
    return (
        <>
            {/* Header Start */}
            <div className="container-fluid bg-primary py-4 mb-4 page-header">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} className="text-center">
                            <h1 className="display-3 text-white animated slideInDown">
                                {props.title}
                            </h1>
                            {props.children}
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Header End */}
        </>
    );
}

export default PageHeader;
