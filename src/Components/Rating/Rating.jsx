import React, { Fragment, useEffect, useState } from "react";
import "./Rating.css";
import { rating_status } from "@src/app/contents";
import { useDispatch, useSelector } from "react-redux";
import { rateCourse } from "@src/features/app/RateSlice";
import { setCourseRating } from "@src/features/app/CourseSlice";
import { setCourse } from "@src/features/app/CourseSlice";

export default function Rating(props) {
    const [avg_rating, setAvgRating] = useState(0);
    const [rating, setRating] = useState(null);
    const [status, setStatus] = useState(null);
    const [hover_status, setHoverStatus] = useState(null);
    const auth_user = useSelector((state) => state.auth.user);
    const course = useSelector((state) => state.course.course);

    const dispatch = useDispatch();

    const handleMouseOver = (e) => {
        setRating(e.target.htmlFor);
        setHoverStatus(rating_status[e.target.htmlFor].status);
    };
    const handleMouseLeave = (e) => {
        setHoverStatus(null);
    };
    const handleOnClick = (e) => {
        setStatus(hover_status);
    };

    const handleRatingClick = (props) => {
        dispatch(rateCourse(props)).then((response) => {
            const { payload } = response;
            dispatch(setCourseRating(payload.data.rating));

            // Make copy of course
            let copy_course = { ...course };
            copy_course.ratings_count = 1;
            copy_course.rating = payload.data.rating;

            // Change the Course content
            dispatch(setCourse(copy_course));
        });
    };

    const roundOf = (rating) => {
        let split = (rating + "").split(".");
        if (split[1] == undefined) return rating;
        let value = 0;
        if (split[1] < 3) {
            value = split[0] + ".0";
        } else if (split[1] >= 3) {
            value = split[0] + ".5";
        } else if (split[1] > 5 && split[1] < 7) {
            value = split[0] + ".5";
        } else {
            value = Math.ceil(split[1] + 1);
        }
        return parseFloat(value);
    };

    const isChecked = (value, rating) => {
        if (rating) {
            return value <= rating ? "checked" : "unchecked";
        } else {
            return "";
        }
    };

    const setTitle = (rating) => {
        return `${rating > 0.5 ? Math.floor(rating / 1) + " " : ""}${
            rating % 1 != 0 ? "1/2 " : ""
        }${rating <= 1 ? "star" : "stars"}`;
    };

    useEffect(() => {
        if (props?.rating?.avg_rating) {
            let round = roundOf(props.rating.avg_rating);
            setAvgRating(round);
        }
    }, [props?.rating?.avg_rating]);

    useEffect(() => {
        if (status) {
            handleRatingClick({
                rating: rating_status[rating].value,
                status,
                fk_course_category_course_id:
                    props?.fk_course_category_course_id,
            });
        }
    }, [status]);

    return (
        <>
            <div className="d-flex align-items-center gap-2">
                {(!auth_user ||
                    (auth_user && props.is_rated && avg_rating)) && (
                    <>
                        <fieldset className="rated">
                            {Object.values(rating_status).map(
                                (rating, index) => {
                                    return (
                                        <label
                                            key={index}
                                            className={
                                                rating.value % 1 != 0
                                                    ? `half ${isChecked(
                                                          rating.value,
                                                          avg_rating
                                                      )}`
                                                    : `full ${isChecked(
                                                          rating.value,
                                                          avg_rating
                                                      )}`
                                            }
                                            htmlFor={`rating${
                                                rating.value * 2
                                            }`}
                                            title={setTitle(rating.value)}
                                        ></label>
                                    );
                                }
                            )}
                        </fieldset>
                        <span className={"text-white"}>
                            ({props?.rating?.no_of_ratings || 0} ratings)
                        </span>
                        <span className={"text-white"}>
                            {props?.rating?.no_of_enrolments} students
                        </span>
                    </>
                )}
                {auth_user && !props.is_rated && (
                    <>
                        <fieldset className="rate">
                            {Object.values(rating_status).map(
                                (rating, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <input
                                                type="radio"
                                                id={`rating${rating.value * 2}`}
                                                name="rating"
                                                value={rating.value * 2}
                                            />
                                            <label
                                                onMouseOver={handleMouseOver}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={handleOnClick}
                                                className={
                                                    rating.value % 1 != 0
                                                        ? "half"
                                                        : "full"
                                                }
                                                htmlFor={`rating${
                                                    rating.value * 2
                                                }`}
                                                title={setTitle(rating.value)}
                                            ></label>
                                        </Fragment>
                                    );
                                }
                            )}

                            {/* <label onMouseOver={handleMouseOver} htmlFor="rating0" title="No star"></label> */}
                        </fieldset>
                        <span
                            className={
                                "text-white " +
                                ((status || hover_status) && "hide")
                            }
                        >
                            {status || hover_status}
                        </span>
                    </>
                )}
            </div>
        </>
    );
}
