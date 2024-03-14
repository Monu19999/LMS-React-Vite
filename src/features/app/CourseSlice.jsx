import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import useFetch from "@src/Hooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
    courses: [],
    course: {},
    search: {
        page: null,
        department: "",
        course_name: "",
    },
    loading: false,
    isSuccess: false,
    message: "",
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
            search_state != undefined
                ? "?" + new URLSearchParams(search_state).toString()
                : "";

        let api_url = api("courses") + query_string;

        const response = await fetch(api_url, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
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
    const response = await fetch(api("course", id), {
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    });
    const json = await response.json();
    return json.data;
});
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
                state.loading = true;
            })
            .addCase(getCourses.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.courses = payload;
                state.isSuccess = true;
            })
            .addCase(getCourses.rejected, (state, { payload }) => {
                state.message = payload;
                state.loading = false;
                state.isSuccess = false;
            })

            // Getting Course detail
            .addCase(getCourse.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getCourse.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.course = payload.course;
                state.isSuccess = true;
            })
            .addCase(getCourse.rejected, (state, { payload }) => {
                state.message = payload;
                state.loading = false;
                state.isSuccess = false;
            });
    },
});

export const { setSearch, resetSearch } = courseSlice.actions;
// export const { courses } = (state) => state.courses.courses;

// export default courseSlice.reducer;
export default courseSlice.reducer;
