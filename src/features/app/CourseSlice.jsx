import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import useFetch from "@src/Hooks/useFetch";

const initialState = {
    courses: [],
    course: {},
    loading: false,
    isSuccess: false,
    message: "",
};

export const getCourses = createAsyncThunk(
    "courses/getCourses",
    async (data = {}) => {
        let search_params =
            data != undefined ? "?" + new URLSearchParams(data).toString() : "";
        let api_url = api("courses") + search_params;
        // console.log("api_url => ", api_url);
        const response = await fetch(api_url, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: data,
            cache: "no-cache",
        });
        const json = await response.json();
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
    reducers: {},
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
// export const { courses } = (state) => state.courses.courses;

// export default courseSlice.reducer;
export default courseSlice.reducer;
