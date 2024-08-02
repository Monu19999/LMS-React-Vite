import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { HTTP_HEADERS } from "@src/app/contents";
import { getAuthHeaders } from "./AuthSlice";

const initialState = {
    search_courses: [],
    courses: [],
    course: null,
    course_topic: null,
    search: {
        page: null,
        department: null,
        office: null,
        course_name: null,
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
        let original_search_state = removeEmpty(state.course.search);
        let copy_search_state = { ...original_search_state };
        let search_state = removeEmpty(copy_search_state);
        if (search_state.hasOwnProperty("department")) {
            search_state["department"] =
                search_state["department"].split("_")[0];
        }
        if (search_state.hasOwnProperty("office")) {
            search_state["office"] = search_state["office"].split("_")[0];
        }
        // console.log("search_state => ", search_state);
        let query_string =
            Object.keys(search_state).length > 0
                ? "?" + new URLSearchParams(search_state).toString()
                : "";
        // console.log(query_string)

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
            navigate(
                Object.keys(original_search_state).length > 0
                    ? "?" +
                          new URLSearchParams(original_search_state).toString()
                    : ""
            );
        }
        // console.log("json data=>",json.data);
        return json.data;
    }
);

export const getCourses = createAsyncThunk(
    "courses/getCourses",
    async (data, { rejectWithValue }) => {
        let api_url = api("category_courses");
        try {
            const headers = getAuthHeaders();
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");
            if (token) {
                api_url = api("auth_category_courses");
            }
            const { data } = await axios.get(api_url, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const getCourse = createAsyncThunk(
    "course/getCourse",
    async (id, { rejectWithValue }) => {
        let api_url = api("category_course", id);
        try {
            const headers = getAuthHeaders();
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");
            if (token) {
                api_url = api("auth_category_course", id);
            }
            const { data } = await axios.get(api_url, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            // console.log("getcourse => ", response);
            return rejectWithValue(response);
        }
    }
);

export const getCourseTopic = createAsyncThunk(
    "course/getCourseTopic",
    async (params, { rejectWithValue }) => {
        let api_url = api("auth_course_topic", params);
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.get(api_url, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const enrollCourse = createAsyncThunk(
    "course/enrollCourse",
    async ({ id, fk_department_id, fk_office_id }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.post(
                api("auth_course_enroll", id),
                {
                    fk_department_id,
                    fk_office_id,
                },
                {
                    headers,
                }
            );
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const convertCourseMedia = createAsyncThunk(
    "course/convertCourseMedia",
    async (params, { rejectWithValue }) => {
        try {
            console.log("converted file ===>>>",params);
            const headers = getAuthHeaders();
            const { data } = await axios.get(
                api("auth_course_media_convert", params),
                
                {
                    headers,
                }
            );
            console.log(data)
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
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
            state.search = {
                page: null,
                department: null,
                office: null,
                course_name: null,
            };
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setTopic: (state, action) => {
            state.topic = action.payload;
        },
        updateState: (state, action) => {
            action.payload.map((item) => {
                state[item.key] = item.value;
            });
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
                state.search_courses = payload.courses;
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
                state.isSuccess = true;
                if (payload.status == 200) {
                    state.courses = payload.data.courses;
                }
            })
            .addCase(getCourses.rejected, (state, { payload }) => {
                state.course_enrolment_loading = false;
                state.course_loading = false;
                state.isSuccess = false;
                if (payload.status === 401) {
                    state.message = payload.message;
                }
                if (payload.status === 422) {
                    state.message = payload.message;
                    state.errors = payload.errors;
                }
            })

            // Getting Course detail
            .addCase(getCourse.pending, (state) => {
                state.course_loading = true;
            })
            .addCase(getCourse.fulfilled, (state, { payload }) => {
                state.course_loading = false;
                state.isSuccess = true;
                if (payload.status == 200) {
                    state.course = payload.data.course;
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(getCourse.rejected, (state, { payload }) => {
                state.course_loading = false;
                state.isSuccess = false;
                if (payload.status === 401) {
                    state.message = payload.message;
                }
                if (payload.status === 422) {
                    state.message = payload.message;
                    state.errors = payload.errors;
                }
            })

            // Course enroll
            .addCase(enrollCourse.pending, (state) => {
                state.course_enrolment_loading = true;
            })
            .addCase(enrollCourse.fulfilled, (state, { payload }) => {
                console.log("Payload => ", payload);
                state.course_enrolment_loading = false;
                if (payload.status == 200) {
                    state.course = payload.course;
                    state.isSuccess = true;
                    state.errors = [];
                    state.error_message = null;
                    toast(payload.message);
                }
            })
            .addCase(enrollCourse.rejected, (state, { payload }) => {
                // console.log("Rejected => ");
                // console.log(payload);
                state.course_enrolment_loading = false;
                state.isSuccess = false;
                if (payload.status === 401) {
                    state.message = payload.message;
                    toast(payload.message);
                }
                if (payload.status === 422) {
                    state.message = payload.message;
                    state.errors = payload.errors;
                    toast(payload.message);
                }
            })

            // Get Course topic
            .addCase(getCourseTopic.pending, (state) => {
                state.course_topic_loading = true;
            })
            .addCase(getCourseTopic.fulfilled, (state, { payload }) => {
                state.course_topic_loading = false;
                if (payload.status == 200) {
                    state.course_topic = payload.data.course_topic;
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(getCourseTopic.rejected, (state, { payload }) => {
                // state.message = payload;
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
            })

            .addCase(convertCourseMedia.pending, (state, { payload }) => {
                console.log("convertCourseMedia.pending ", payload);
            })
            .addCase(convertCourseMedia.fulfilled, (state, { payload }) => {
                console.log("convertCourseMedia.fulfilled", payload);
            })
            .addCase(convertCourseMedia.rejected, (state, { payload }) => {
                console.log("convertCourseMedia.rejected ", payload);
            });
    },
});

export const { setSearch, resetSearch, setCourse, setTopic, updateState } =
    courseSlice.actions;

export default courseSlice.reducer;
