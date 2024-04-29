import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";

const initialState = {
    pages: {},
};

export const getDashboard = createAsyncThunk(
    "member/getDasboard",
    async (args, { getState }) => {
        let api_url = api("member_dashboard");
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await fetch(api_url, {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-cache",
            });
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error("Bad response", {
                    cause: json,
                });
            }
            return json.data;
        } catch (error) {
            return error.cause;
        }
    }
);

export const myCourses = createAsyncThunk(
    "member/myCourses",
    async (args, { getState }) => {
        let api_url = api("member_courses");
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await fetch(api_url, {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-cache",
            });
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error("Bad response", {
                    cause: json,
                });
            }
            return json.data;
        } catch (error) {
            return error.cause;
        }
    }
);

export const availableCourses = createAsyncThunk(
    "member/availableCourses",
    async (args, { getState }) => {
        let api_url = api("member_available_courses");
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await fetch(api_url, {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-cache",
            });
            const json = await response.json();
            if (response.status !== 200) {
                throw new Error("Bad response", {
                    cause: json,
                });
            }
            return json.data;
        } catch (error) {
            return error.cause;
        }
    }
);

export const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboard.pending, (state, action) => {
                // state.status = "loading";
            })
            .addCase(getDashboard.fulfilled, (state, { payload }) => {
                // state.status = "succeeded";
                state.pages.dashboard = payload;
            })
            .addCase(getDashboard.rejected, (state, action) => {
                // state.status = "failed";
                state.error = action.error;
            })

            // Get My Courses
            .addCase(myCourses.pending, (state, action) => {})
            .addCase(myCourses.fulfilled, (state, { payload }) => {
                state.pages.my_courses = payload;
            })
            .addCase(myCourses.rejected, (state, action) => {
                state.error = action.error;
            })

            // Get Available Courses
            .addCase(availableCourses.pending, (state, action) => {})
            .addCase(availableCourses.fulfilled, (state, { payload }) => {
                state.pages.available_courses = payload;
            })
            .addCase(availableCourses.rejected, (state, action) => {
                state.error = action.error;
            });
    },
});

export default memberSlice.reducer;
