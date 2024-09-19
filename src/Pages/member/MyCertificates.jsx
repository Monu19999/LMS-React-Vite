import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myCertificates } from "@src/features/member/MemberSlice";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MyCertificates = () => {
    const dispatch = useDispatch();

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(myCertificates());
    }, []);

    const handleDownloadBtn = async (item) => {
        let origin =
            import.meta.env.VITE_APP_ENV == "production"
                ? import.meta.env.VITE_PROD_ASSET_URL
                : import.meta.env.VITE_DEV_ASSET_URL;
        try {
            let api_url = `${origin}/storage/${item?.certificate.certificate_path}`;
            let split = item?.certificate.certificate_path.split("/");
            let filename = split[1];
            const response = await axios.get(api_url, {
                responseType: "blob",
            });
            // .then((res) => {
            //     fileDownload(res.data, filename);
            // });

            // Create a Blob from the response data
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(pdfBlob);

            // Create a temporary <a> element to trigger the download
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", filename); // Set the desired filename for the downloaded file

            // Append the <a> element to the body and click it to trigger the download
            document.body.appendChild(tempLink);
            tempLink.click();

            // Clean up the temporary elements and URL
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <>
            <h4 className="mb-4 heading-bg">My Certificates</h4>
            <div className="row">
                {member?.my_certificates?.certificates?.length > 0 ? (
                    member?.my_certificates?.certificates.map((item, index) => (
                        <div
                            className="col-sm-12 col-md-12 col-lg-4"
                            key={item.id}
                        >
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Certificate of{" "}
                                        {item.category_course.course_name_en}
                                    </h5>
                                    <div className="course-item bg-light">
                                        <div className="position-relative overflow-hidden">
                                            <img
                                                className="img-fluid"
                                                src={
                                                    item?.course?.upload
                                                        ?.preview_path ??
                                                    "assets/img/course-2.jpg"
                                                }
                                                alt={
                                                    item?.course?.upload
                                                        ?.original_name
                                                }
                                            />
                                            <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                                <a
                                                    href="#"
                                                    type="button"
                                                    className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                                                    style={{
                                                        borderRadius:
                                                            "30px 30px 30px 30px",
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDownloadBtn(item);
                                                    }}
                                                    download
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Button variant="primary">Download</Button> */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4 className="text-center">No Certificate Available!</h4>
                )}
            </div>
        </>
    );
};

export default MyCertificates;
