import React from "react";
import { useCountdown } from "./useCountdown";
import "./CountdownTimer.css";

export default function CountdownTimer({ handleCountDownExpired, targetDate }) {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    const DateTimeDisplay = ({ value, type, isDanger }) => {
        return (
            <div className={isDanger ? "countdown danger" : "countdown"}>
                <p>{value}</p>
                <span>{type}</span>
            </div>
        );
    };

    const ShowCounter = ({ days, hours, minutes, seconds }) => {
        return (
            <div className="show-counter">
                <div className="countdown-link">
                    {/* <DateTimeDisplay
                        value={days}
                        type={"Days"}
                        isDanger={days <= 3}
                    />
                    <p>:</p> */}
                    <DateTimeDisplay
                        value={hours}
                        type={"Hours"}
                        isDanger={false}
                    />
                    <p>:</p>
                    <DateTimeDisplay
                        value={minutes}
                        type={"Mins"}
                        isDanger={false}
                    />
                    <p>:</p>
                    <DateTimeDisplay
                        value={seconds}
                        type={"Seconds"}
                        isDanger={false}
                    />
                </div>
            </div>
        );
    };

    const CountDownExpired = () => {
        handleCountDownExpired();
    };

    return (
        <>
            {hours + minutes + seconds <= 0 ? (
                <CountDownExpired />
            ) : (
                <ShowCounter
                    // days={days}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                />
            )}
        </>
    );
}
