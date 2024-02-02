import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "@src/Hooks/useFetch";

function Page() {
    let { page } = useParams();
    const { isLoading, serverError, apiData } = useFetch(
        "GET",
        `https://raw.githubusercontent.com/Monu19999/LMS-React-Vite/main/src/apis/${page}.json`,
        {}
    );
    // `http://localhost:8000/api/page/${page}/show`,
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {apiData?.data.page && apiData.data.page.description_en}
        </div>
    );
}

export default Page;
