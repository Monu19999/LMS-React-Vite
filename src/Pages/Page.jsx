import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "@src/Hooks/useFetch";

function Page() {
    let { page } = useParams();
    const { isLoading, serverError, apiData } = useFetch(
        "GET",
        `http://localhost:8000/api/page/${page}/show`,
        {}
    );
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {apiData?.data.page && apiData.data.page.description_en}
        </div>
    );
}

export default Page;
