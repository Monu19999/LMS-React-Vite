import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";

const initialState = {
    search_courses: [],
    courses: [],
    course: {},
    course_topic: {},
    search: {
        page: null,
        department: "",
        course_name: "",
    },
    course_loading: false,
    course_topic_loading: false,
    course_enrolment_loading: false,
    isSuccess: false,
    message: "",

    errors: [],
    error_message: "",
};

function removeEmpty(obj) {
    return Object.entries(obj)
        .filter(([_, v]) => v != null && v != "")
        .reduce(
            (acc, [k, v]) => ({
                ...acc,
                [k]: v === Object(v) ? removeEmpty(v) : v,
            }),
            {}
        );
}

export const readCourseTopic = createAsyncThunk(
    "course/readCourseTopic",
    async (params) => {
        let api_url = api("auth_course_topic_read", params);

        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const token =
            Cookies.get("token") == undefined ? null : Cookies.get("token");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        try {
            const response = await fetch(api_url, {
                mode: "cors",
                method: "post",
                headers,
                cache: "no-cache",
            });
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error("Bad response", {
                    cause: json,
                });
            }
            return json;
        } catch (error) {
            return error.cause;
        }
    }
);

export const getSearchCourses = createAsyncThunk(
    "courses/getSearchCourses",
    async (navigate, { getState }) => {
        const state = getState();

        let search_state = removeEmpty(state.course.search);
        console.log(search_state)
        let departmentID = {department: search_state.department.split("_")[1]};
        let query_string =
        Object.keys(search_state).length > 0
        ? "?" + new URLSearchParams(departmentID).toString()
        : "";
        console.log(query_string)

        let api_url = api("category_courses") + query_string;

        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const token =
            Cookies.get("token") == undefined ? null : Cookies.get("token");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
            api_url = api("auth_category_courses") + query_string;
        }
        const response = await fetch(api_url, {
            mode: "cors",
            method: "get",
            headers,
            cache: "no-cache",
        });
        const json = await response.json();
        if (navigate) {
            navigate(Object.keys(search_state).length > 0
        ? "?" + new URLSearchParams(search_state).toString()
        : "");
        }
        return json.data;
    }
);

export const getCourses = createAsyncThunk(
    "courses/getCourses",
    async (navigate, { getState }) => {
        let api_url = api("category_courses");

        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const token =
            Cookies.get("token") == undefined ? null : Cookies.get("token");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
            api_url = api("auth_category_courses");
        }
        const response = await fetch(api_url, {
            mode: "cors",
            method: "get",
            headers,
            cache: "no-cache",
        });
        const json = await response.json();
        if (navigate) {
            navigate(query_string);
        }
        return json.data;
    }
);

export const getCourse = createAsyncThunk("course/getCourse", async (id) => {
    let api_url = api("category_course", id);

    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const token =
        Cookies.get("token") == undefined ? null : Cookies.get("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
        api_url = api("auth_category_course", id);
    }
    try {
        const response = await fetch(api_url, {
            method: "get",
            headers,
            cache: "no-cache",
        });
        const json = await response.json();
        if (response.status !== 200) {
            throw new Error("Bad response", {
                cause: json,
            });
        }
        return json;
    } catch (error) {
        return error.cause;
    }
});

export const getCourseTopic = createAsyncThunk(
    "course/getCourseTopic",
    async (params) => {
        let api_url = api("auth_course_topic", params);
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const token =
            Cookies.get("token") == undefined ? null : Cookies.get("token");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        try {
            const response = await fetch(api_url, {
                method: "get",
                headers,
                cache: "no-cache",
            });
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error("Bad response", {
                    cause: json,
                });
            }
            return json;
        } catch (error) {
            return error.cause;
        }
    }
);

export const enrollCourse = createAsyncThunk(
    "course/enrollCourse",
    async (course) => {
        try {
            let headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            let data = JSON.stringify({
                fk_department_id:
                    course.course.assigned_admin.course_category
                        .fk_department_id,
            });
            const response = await fetch(
                api(
                    "auth_course_enroll",
                    course.course.assigned_admin.category_course.id
                ),
                {
                    method: "post",
                    headers,
                    body: data,
                }
            );
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error("Bad response", {
                    cause: json,
                });
            }
            return json.data;
            // return course;
        } catch (error) {
            return error.cause;
        }
    }
);

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        resetSearch: (state) => {
            state.search = { page: null, department: "", course_name: "" };
        },
        updateCourse: (state, action) => {
            state.course = action.payload;
        },
        updateTopic: (state, action) => {
            state.topic = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            // Search the course
            .addCase(getSearchCourses.pending, (state, { payload }) => {
                state.course_loading = true;
            })
            .addCase(getSearchCourses.fulfilled, (state, { payload }) => {
                state.course_enrolment_loading = false;
                state.course_loading = false;
                state.search_courses = payload;
                state.isSuccess = true;
            })
            .addCase(getSearchCourses.rejected, (state, { payload }) => {
                state.message = payload;
                state.course_enrolment_loading = false;
                state.course_loading = false;
                state.isSuccess = false;
            })

            // Getting all courses
            .addCase(getCourses.pending, (state, { payload }) => {
                state.course_loading = true;
            })
            .addCase(getCourses.fulfilled, (state, { payload }) => {
                state.course_enrolment_loading = false;
                state.course_loading = false;
                state.courses = payload.courses;
                state.isSuccess = true;
            })
            .addCase(getCourses.rejected, (state, { payload }) => {
                state.message = payload;
                state.course_enrolment_loading = false;
                state.course_loading = false;
                state.isSuccess = false;
            })

            // Getting Course detail
            .addCase(getCourse.pending, (state, { payload }) => {
                state.course_loading = true;
            })
            .addCase(getCourse.fulfilled, (state, { payload }) => {
                if (payload != undefined) {
                    if (
                        payload.hasOwnProperty("status") &&
                        payload.status !== 200
                    ) {
                        state.course = null;
                        state.error_message = payload.message;
                    } else {
                        let data = payload.data;
                        state.course_loading = false;
                        state.course = data.course;
                        state.isSuccess = true;
                        state.errors = [];
                        state.error_message = null;
                    }
                }
            })
            .addCase(getCourse.rejected, (state, { payload }) => {
                state.message = payload;
                state.course_loading = false;
                state.isSuccess = false;
            })

            // Course enroll
            .addCase(enrollCourse.pending, (state, { payload }) => {
                state.course_enrolment_loading = true;
            })
            .addCase(enrollCourse.fulfilled, (state, { payload }) => {
                if (payload.hasOwnProperty("message")) {
                    state.error_message = payload.message;
                } else {
                    state.course_enrolment_loading = false;
                    state.course = payload.course;
                    state.isSuccess = true;
                    state.errors = [];
                    state.error_message = null;
                    // console.log(current(state));
                    // let current_state = current(state);
                    // console.log(
                    //     "replaceCourse => ",
                    //     replaceCourse(
                    //         current_state.courses.data,
                    //         current_state.course
                    //     )
                    // );
                    // state.courses = current_state;
                }
            })
            .addCase(enrollCourse.rejected, (state, { payload }) => {
                state.message = payload;
                state.course_enrolment_loading = false;
                state.isSuccess = false;
            })

            // Get Course topic
            .addCase(getCourseTopic.pending, (state, { payload }) => {
                state.course_topic_loading = true;
            })
            .addCase(getCourseTopic.fulfilled, (state, { payload }) => {
                if (payload != undefined) {
                    let data = payload.data;
                    if (data.hasOwnProperty("status") && data.status != 200) {
                        state.error_message = data.message;
                    } else {
                        state.course_topic_loading = false;
                        state.course_topic = data.course_topic;
                        state.errors = [];
                        state.error_message = null;
                    }
                }
            })
            .addCase(getCourseTopic.rejected, (state, { payload }) => {
                state.message = payload;
                state.course_topic_loading = false;
            })

            // Set Read the course
            .addCase(readCourseTopic.pending, (state, { payload }) => {
                // console.log("readCourseTopic.pending ", payload);
            })
            .addCase(readCourseTopic.fulfilled, (state, { payload }) => {
                // console.log("readCourseTopic.fulfilled", payload);
            })
            .addCase(readCourseTopic.rejected, (state, { payload }) => {
                // console.log("readCourseTopic.rejected ", payload);
            });
    },
});

export const { setSearch, resetSearch, updateCourse, updateTopic } =
    courseSlice.actions;

export default courseSlice.reducer;
