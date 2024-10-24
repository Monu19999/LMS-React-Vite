import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";

const initialState = {
    courses: [],
    course: {},
    search: {
        page: null,
        department: "",
        course_name: "",
    },
    course_loading: false,
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

export const getCourses = createAsyncThunk(
    "courses/getCourses",
    async (navigate, { getState }) => {
        const state = getState();

        let search_state = removeEmpty(state.course.search);
        let query_string =
            Object.keys(search_state).length > 0
                ? "?" + new URLSearchParams(search_state).toString()
                : "";

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
    const response = await fetch(api_url, {
        method: "get",
        headers,
        cache: "no-cache",
    });
    const json = await response.json();
    return json.data;
});

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

const replaceCourse = (current, course) => {
    console.log("current", current);
    let update_courses = { ...current };
    console.log("current data", update_courses);
    console.log("current course", course);
    let index = update_courses.findIndex((c) => c.id == course.id);
    console.log("index", index);
    console.log("update_courses.data", update_courses[index]);
    console.log("course", course);
    if (index >= 0) {
        delete update_courses[index];
        console.log("update_courses 1", update_courses[index]);
        update_courses[index] = course;
    }
    console.log("update_courses", update_courses);
    return update_courses;
};

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
    },
    extraReducers(builder) {
        builder
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
                if (payload.hasOwnProperty("errors")) {
                    state.errors = payload.errors;
                    state.error_message = payload.message;
                } else {
                    state.course_loading = false;
                    state.course = payload.course;
                    state.isSuccess = true;
                    state.errors = [];
                    state.error_message = null;
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
                console.log("payload => ", payload);
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
            });
    },
});

export const { setSearch, resetSearch } = courseSlice.actions;

export default courseSlice.reducer;
