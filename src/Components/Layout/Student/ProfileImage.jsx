import React, { useEffect, useState } from "react";

export default function ProfileImage({ upload, ...props }) {
    const [preview, setPreview] = useState();
    useEffect(() => {
        setPreview(
            upload?.download_path || "assets/img/dashboard/profile-demo.png"
        );
    }, [upload]);

    return <img {...props} src={preview} alt="profile image" />;
}
