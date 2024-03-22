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

export const userCourses = createAsyncThunk(
    "member/userCourses",
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
            .addCase(userCourses.pending, (state, action) => {
                // state.status = "loading";
            })
            .addCase(userCourses.fulfilled, (state, { payload }) => {
                // state.status = "succeeded";
                state.pages.my_courses = payload;
            })
            .addCase(userCourses.rejected, (state, action) => {
                // state.status = "failed";
                state.error = action.error;
            });
    },
});

export default memberSlice.reducer;
