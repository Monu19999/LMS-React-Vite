import { useEffect, useState } from "react";

const useFetch = (method, url, data) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const resp = await fetch(url, {
                    mode: 'cors',
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*'
                    },
                    data: data,
                    cache: "no-cache",
                });
                const api_data = await resp.json();

                setApiData(api_data);
                setIsLoading(false);
            } catch (error) {
                setServerError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [method, url]);
    return { isLoading, apiData, serverError };
};

export default useFetch;
