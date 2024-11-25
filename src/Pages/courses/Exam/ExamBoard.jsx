import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startQbmsExam } from "@src/features/app/QbmsExamSlice";
import { setCountDown } from "@src/features/app/QbmsExamSlice";
import { resetCountDownTime } from "@src/features/app/QbmsExamSlice";

export default function ExamBoard({ count_down_time }) {
    // let { course_id } = useParams();
    // const exam = useSelector((state) => state.qbms_exam.exam);
    const dispatch = useDispatch();
    let [timerClock, setTimerClock] = useState(count_down_time);

    // let [days, setDays] = useState(0);
    let [hours, setHours] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(0);

    // const handleStartQbmsExam = async (exam) => {
    //     if (exam == null) {
    //         let result = await dispatch(startQbmsExam({ course: course_id }));
    //         let { payload } = result;
    //         console.log(payload);
    //     }
    // };
    // useEffect(() => {
    //     handleStartQbmsExam(exam);
    // }, [exam]);

    useEffect(() => {
        if (timerClock >= 0) {
            let timer = setInterval(function () {
                setTimerClock(Math.floor(timerClock - 1));
                secondsToHms();
            }, 1000);

            return () => {
                // this runs as the clean up function for the useEffect
                clearInterval(timer);
            };
        }
        if (timerClock === 0) {
            console.log("set to 0");
        }
    }, [timerClock]);

    function secondsToHms() {
        let d = Number(timerClock);
        // console.log(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);

        setHours(h);
        setMinutes(m);
        setSeconds(s);
        dispatch(setCountDown(d));
        if (d === 0) {
            dispatch(resetCountDownTime(d));
        }

        return [h, m, s];
    }

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

    return (
        <div>
            <ShowCounter
                // days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        </div>
    );
}
