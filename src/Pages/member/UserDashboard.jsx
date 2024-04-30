import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@src/features/member/MemberSlice";
import { Link } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import ReactPlayer from "react-player";

function UserDashboard() {
    const videoRef = useRef(ReactPlayer);
    const [played, setPlayed] = useState(0);

    const dispatch = useDispatch();

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(getDashboard());
    }, []);
    return (
        <>
            <h2 className="mb-4">Dashboard</h2>
            <div className="row">
                {Memberloading ? (
                    <BootstrapSpinner />
                ) : (
                    <>
                        {/* Enrolled Course Card Example */}
                        <div className="col-xl-4 col-md-6 mb-4">
                            <Link to="courses">
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
                            </Link>
                        </div>
                        {/* Certificate Card Example */}
                        <div className="col-xl-4 col-md-6 mb-4">
                            <Link to="certificates">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Certificate
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {
                                                        member?.dashboard
                                                            ?.certificates_count
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-file fa-2x text-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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
                        <div>
                            {/* <ReactPlayer
                                url="/public/test.mp4"
                                playing={true}
                                controls={true}
                                pip={false}
                                onPlay={() => console.log("played")}
                                onPause={() => console.log("paused")}
                                onEnded={() => console.log("ended")}
                                config={{
                                    file: {
                                        attributes: {
                                            controlsList: "nodownload", // nodownload => disable download, nofullscreen => disable fullscreen, noplaybackrate => disable playback speed
                                            disablePictureInPicture: true,
                                        },
                                    },
                                }}
                                ref={videoRef}
                                onContextMenu={(e) => e.preventDefault()}
                                onProgress={() => {
                                    videoRef.current.getCurrentTime() >=
                                        played &&
                                        setPlayed(
                                            videoRef.current.getCurrentTime()
                                        );
                                }}
                                onSeek={() => {
                                    videoRef.current.getCurrentTime() >
                                        played &&
                                        videoRef.current.seekTo(played);
                                }}
                            /> */}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default UserDashboard;
