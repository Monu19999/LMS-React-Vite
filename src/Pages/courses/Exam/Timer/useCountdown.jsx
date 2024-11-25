import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    let return_values = getReturnValues(countDown);
    return return_values;
};

const getReturnValues = (countDown) => {
    // calculate time left
    return [
        Math.floor(countDown / (1000 * 60 * 60 * 24)),
        Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)),
        Math.floor((countDown % (1000 * 60)) / 1000),
    ];
};

export { useCountdown };
