import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function CourseSearchForm({ onChangeCallback }) {
    const [course_name, setCourseName] = useState("");

    const handleInputChange = (e) => {
        const input_value = e.target.value;
        setCourseName(input_value);
        onChangeCallback(input_value.toLowerCase());
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col
                    lg={12}
                    className="wow fadeInUp"
                    style={{ backgroundColor: "#06bbcc" }}
                >
                    <div className="search-title">
                        {/* Search Form Start */}
                        <Row className="justify-content-center">
                            <div className="form-group">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    value={course_name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Search By Course Name"
                                />
                            </div>
                        </Row>
                        {/* Search Form End */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CourseSearchForm;
