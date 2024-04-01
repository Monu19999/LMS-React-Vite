import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@src/features/member/MemberSlice";

function UserDashboard() {
    const dispatch = useDispatch();

    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(getDashboard());
    }, []);

    return (
        <>
            <h2 className="mb-4">Dashboard</h2>
            <div className="row">
                {/* Enrolled Course Card Example */}
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Enrolled Course
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {
                                            member?.dashboard
                                                ?.enrolled_courses_count
                                        }
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-book fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Certificate Card Example */}
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Certificate
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {member?.dashboard?.certificates_count}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-file fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Pending Requests Card Example */}
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Course completion
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {
                                            member?.dashboard
                                                ?.completed_courses_count
                                        }
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user-graduate fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12 mb-4">
                    {/* Project Card Example */}
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Projects
                            </h6>
                        </div>
                        <div className="card-body">
                            <h4 className="small font-weight-bold">
                                Server Migration{" "}
                                <span className="float-right">20%</span>
                            </h4>
                            <div className="progress mb-4">
                                <div
                                    className="progress-bar bg-danger"
                                    role="progressbar"
                                    style={{ width: "20%" }}
                                    aria-valuenow={20}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <h4 className="small font-weight-bold">
                                Sales Tracking{" "}
                                <span className="float-right">40%</span>
                            </h4>
                            <div className="progress mb-4">
                                <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "40%" }}
                                    aria-valuenow={40}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <h4 className="small font-weight-bold">
                                Customer Database{" "}
                                <span className="float-right">60%</span>
                            </h4>
                            <div className="progress mb-4">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "60%" }}
                                    aria-valuenow={60}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <h4 className="small font-weight-bold">
                                Payout Details{" "}
                                <span className="float-right">80%</span>
                            </h4>
                            <div className="progress mb-4">
                                <div
                                    className="progress-bar bg-info"
                                    role="progressbar"
                                    style={{ width: "80%" }}
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <h4 className="small font-weight-bold">
                                Account Setup{" "}
                                <span className="float-right">Complete!</span>
                            </h4>
                            <div className="progress">
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "100%" }}
                                    aria-valuenow={100}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
