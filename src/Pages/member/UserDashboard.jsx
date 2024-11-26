import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@src/features/member/MemberSlice";
import { Link } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { Card, CardBody, Col, Row } from "react-bootstrap";

function UserDashboard() {
    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboard());
    }, []);
    return (
        <>
            <h4 className="mb-4 heading-bg">Dashboard</h4>
            <Row>
                {Memberloading ? (
                    <BootstrapSpinner />
                ) : (
                    <>
                        {/* Enrolled Course Card */}
                        <Col xl={4} md={6} className="mb-4">
                            <Link to="courses">
                                <Card className="border-left-primary shadow h-100 py-2">
                                    <CardBody>
                                        <Row className="no-gutters align-items-center">
                                            <Col className="mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Enrolled Course
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {
                                                        member?.dashboard
                                                            ?.enrolled_courses_count
                                                    }
                                                </div>
                                            </Col>
                                            <div className="col-auto">
                                                <i className="fas fa-book fa-2x text-primary" />
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        {/* Certificate Card */}
                        <Col xl={4} md={6} className="mb-4">
                            <Link to="certificates">
                                <Card className="border-left-course shadow h-100 py-2">
                                    <CardBody>
                                        <Row className="no-gutters align-items-center">
                                            <Col className="mr-2">
                                                <div className="text-xs font-weight-bold text-course text-uppercase mb-1">
                                                    Certificate
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {
                                                        member?.dashboard
                                                            ?.certificates_count
                                                    }
                                                </div>
                                            </Col>
                                            <div className="col-auto">
                                                <i className="fas fa-file fa-2x text-course" />
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        {/* Course completion Card */}
                        <Col xl={4} md={6} className="mb-4">
                            <Card className="border-left-success shadow h-100 py-2">
                                <CardBody>
                                    <Row className="no-gutters align-items-center">
                                        <Col className="mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Course completion
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {
                                                    member?.dashboard
                                                        ?.completed_courses_count
                                                }
                                            </div>
                                        </Col>
                                        <div className="col-auto">
                                            <i className="fas fa-user-graduate fa-2x text-success" />
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
}

export default UserDashboard;
