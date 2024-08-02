import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import api from "@src/apis/api";
import Cookies from "js-cookie";
import { getUser, getAuthHeaders } from "@src/features/app/AuthSlice";
import { toast } from "react-toastify";
import ProfileImage from "@src/Components/Layout/Student/ProfileImage";
import ServerErrors from "@src/Components/ServerErrors";

export default function Profile() {
    const [image, setImage] = useState("");
    const user = useSelector((state) => state.auth.user);
    const [upload, setUpload] = useState();
    const [server_errors, setServerErrors] = useState(null);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitUploadFile = async (data, event) => {
        let form_data = new FormData();
        form_data.append("image", image);
        let headers = getAuthHeaders(true);
        try {
            let response = await axios.post(
                api("auth_update_profile_image", user),
                form_data,
                {
                    headers,
                }
            );
            if (response.data.status == 200) {
                toast(response.data.message);
                dispatch(getUser());
            }
        } catch (error) {
            const { response } = error;
            setServerErrors(response.data);
        }
    };

    useEffect(() => {
        if (user?.upload) {
            if (!upload) {
                setUpload(user?.upload);
            }
        } else {
            if (!upload) {
                setUpload({
                    download_path: user?.upload?.download_path,
                });
            }
        }
    }, [user, upload]);

    const handleUploadedFile = (event) => {
        setServerErrors(null);
        const file = event.target.files[0];
        setImage(file);
        const urlImage = URL.createObjectURL(file);
        setUpload({ download_path: urlImage });
    };

    const handleRemove = () => {
        setUpload();
        setImage("");
        reset();
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            setImage("");
            reset();
        }
    }, [isSubmitSuccessful]);
    return (
        <>
            <h4 className="mb-4 heading-bg">Profile</h4>
            <div className="row">
                <div className="col-xl-4">
                    {/* Profile picture card*/}
                    <div
                        className="card mb-4 mb-xl-0"
                        style={{ height: "100%" }}
                    >
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">
                            <form
                                encType="multipart/form-data"
                                onSubmit={handleSubmit(submitUploadFile)}
                            >
                                {server_errors?.errors && (
                                    <ServerErrors
                                        errors={server_errors.errors}
                                    />
                                )}
                                {/* Profile picture image*/}
                                <ProfileImage
                                    upload={upload}
                                    className="img-account-profile rounded-circle mb-2"
                                    style={{ height: "150px", width: "150px" }}
                                />
                                <div>
                                    {/* <input
                                        type="file"
                                        id="customFile"
                                        {...register("image", {
                                            required: "Please upload an image",
                                            validate: {
                                                // If you want other file format, then add them to the array
                                                fileType: (file) => {
                                                    console.log(file);
                                                    return (
                                                        ["jpg", "png"].includes(
                                                            file[0].type
                                                                .split("/")[1]
                                                                .toLowerCase()
                                                        ) ||
                                                        "The file type should be jpg or png."
                                                    );
                                                },
                                                //Add other validation if you want. For example, checking for file size
                                                //fileSize:file =>  file[0].size/(1024*1024)<5 || "The file size should be less than 5MB"
                                            },
                                        })}
                                        accept="image/jpg, image/png"
                                        onChange={handleUploadedFile}
                                        hidden
                                    /> */}
                                    <div className="d-flex justify-content-center gap-2">
                                        {image && (
                                            <>
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        right: "90px",
                                                        top: "60px",
                                                        zIndex: "999",
                                                    }}
                                                    type="button"
                                                    onClick={() => {
                                                        handleRemove();
                                                    }}
                                                    disabled={!image}
                                                >
                                                    <i
                                                        className="fa fa-trash mr-3"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                </span>
                                                <button
                                                    className="btn btn-success"
                                                    type="submit"
                                                    disabled={
                                                        !image ||
                                                        isSubmitSuccessful
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </>
                                        )}
                                        {!image && (
                                            // <label
                                            //     className="btn btn-info btn-block"
                                            //     htmlFor="customFile"
                                            // >
                                            //     Upload
                                            // </label>
                                            <input
                                                type="file"
                                                id="customFile"
                                                className="btn btn-info btn-block"
                                                {...register("image", {
                                                    required:
                                                        "Please upload an image",
                                                    validate: {
                                                        // If you want other file format, then add them to the array
                                                        fileType: (file) => {
                                                            return (
                                                                [
                                                                    "jpg",
                                                                    "png",
                                                                ].includes(
                                                                    file[0].type
                                                                        .split(
                                                                            "/"
                                                                        )[1]
                                                                        .toLowerCase()
                                                                ) ||
                                                                "The file type should be jpg or png."
                                                            );
                                                        },
                                                        //Add other validation if you want. For example, checking for file size
                                                        //fileSize:file =>  file[0].size/(1024*1024)<5 || "The file size should be less than 5MB"
                                                    },
                                                })}
                                                accept=".jpg, .png"
                                                onChange={handleUploadedFile}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Profile picture help block*/}
                                <div className="small font-italic text-muted mb-4">
                                    {errors.file?.message}
                                </div>
                                {/* Profile picture upload button*/}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    {/* Account details card*/}
                    <div className="card mb-4" style={{ height: "100%" }}>
                        <div className="card-header">Profile Details</div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (username)*/}
                                <div className="mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="inputUsername"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className="form-control"
                                        disabled
                                        id="inputUsername"
                                        type="text"
                                        placeholder="Enter your username"
                                        defaultValue={user?.username}
                                    />
                                </div>
                                {/* Form Row*/}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name)*/}
                                    <div className="col-md-6">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputFirstName"
                                        >
                                            First name
                                        </label>
                                        <input
                                            className="form-control"
                                            disabled
                                            id="inputFirstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            defaultValue={user?.first_name}
                                        />
                                    </div>
                                    {/* Form Group (last name)*/}
                                    <div className="col-md-6">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputLastName"
                                        >
                                            Last name
                                        </label>
                                        <input
                                            className="form-control"
                                            disabled
                                            id="inputLastName"
                                            type="text"
                                            placeholder="Enter your last name"
                                            defaultValue={user?.last_name}
                                        />
                                    </div>
                                </div>
                                {/* Form Row        */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (Department)*/}
                                    <div className="col-md-6">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputDepartment"
                                        >
                                            Department
                                        </label>
                                        <input
                                            className="form-control"
                                            disabled
                                            id="inputDepartment"
                                            type="text"
                                            placeholder="Enter your Department"
                                            defaultValue={
                                                user?.detail?.department
                                                    ?.title_en
                                            }
                                        />
                                    </div>
                                    {/* Form Group (organization name)*/}
                                    <div className="col-md-6">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputOrgName"
                                        >
                                            Organization name
                                        </label>
                                        <input
                                            className="form-control"
                                            disabled
                                            id="inputOrgName"
                                            type="text"
                                            placeholder="Enter your organization name"
                                            defaultValue={
                                                user?.detail?.office?.title_en
                                            }
                                        />
                                    </div>
                                </div>
                                {/* Form Row*/}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (email address)*/}
                                    <div className="col-md-6">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputEmailAddress"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            className="form-control"
                                            disabled
                                            id="inputEmailAddress"
                                            type="email"
                                            placeholder="Enter your email address"
                                            defaultValue={user?.email}
                                        />
                                    </div>
                                    {/* Form Group (Mobile number)*/}
                                    <div className="col-md-6">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputMobile"
                                        >
                                            Mobile number
                                        </label>
                                        <input
                                            className="form-control"
                                            disabled
                                            id="inputMobile"
                                            type="text"
                                            placeholder="Enter your mobile number"
                                            defaultValue={user?.mobile}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
