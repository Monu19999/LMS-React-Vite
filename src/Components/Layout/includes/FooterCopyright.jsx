import { Col, Container, Row } from "react-bootstrap";

function FooterCopyright() {
    return (
        <Container>
            <div className="copyright">
                <Row>
                    <Col
                        md={4}
                        lg={4}
                        className="text-center text-md-start mb-3 mb-md-0"
                    >
                        ©{" "}
                        <a className="border-bottom" href="index.html">
                            e-shiksha
                        </a>
                        , All Right Reserved.
                    </Col>
                    <Col md={4} lg={4} className="text-center">
                        {/* Last Update On : 03 Nov 2023, 15:50 */}
                    </Col>
                    <Col md={4} lg={4} className="text-center text-md-end">
                        <div className="footer-menu">
                            Designed and Developed By{" "}
                            <a className="border-bottom" href="index.html">
                                MPSEDC (CoE)
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default FooterCopyright;
