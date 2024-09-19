import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import { getAuthHeaders } from "../app/AuthSlice";
import axios from "axios";

const initialState = {
    member_loading: false,
    pages: {},
};

export const getDashboard = createAsyncThunk(
    "member/getDasboard",
    async (data, { rejectWithValue }) => {
        let api_url = api("member_dashboard");
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.get(api_url, {
                headers,
                withCredentials: true,
            });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const myCourses = createAsyncThunk(
    "member/myCourses",
    async (data, { rejectWithValue }) => {
        let api_url = api("member_courses");
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.get(api_url, {
                headers,
                withCredentials: true,
            });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const availableCourses = createAsyncThunk(
    "member/availableCourses",
    async (data, { rejectWithValue }) => {
        let api_url = api("member_available_courses");
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.get(api_url, {
                headers,
                withCredentials: true,
            });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const myCertificates = createAsyncThunk(
    "member/myCertificates",
    async (data, { rejectWithValue }) => {
        let api_url = api("member_certificates");
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.get(api_url, {
                headers,
                withCredentials: true,
            });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
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
                state.member_loading = true;
            })
            .addCase(getDashboard.fulfilled, (state, { payload }) => {
                state.member_loading = false;
                if (payload.status == 200) {
                    state.pages.dashboard = payload.data;
                }
            })
            .addCase(getDashboard.rejected, (state, { payload }) => {
                state.member_loading = false;
                // state.error = payload.error;
            })

            // Get My Courses
            .addCase(myCourses.pending, (state, action) => {
                state.member_loading = true;
            })
            .addCase(myCourses.fulfilled, (state, { payload }) => {
                state.member_loading = false;
                // state.pages.my_courses = payload;
                if (payload.status == 200) {
                    state.pages.my_courses = payload.data;
                }
            })
            .addCase(myCourses.rejected, (state, action) => {
                state.member_loading = false;
                state.error = action.error;
            })

            // Get Available Courses
            .addCase(availableCourses.pending, (state, action) => {
                state.member_loading = true;
            })
            .addCase(availableCourses.fulfilled, (state, { payload }) => {
                state.member_loading = false;
                // state.pages.available_courses = payload;
                if (payload.status == 200) {
                    state.pages.available_courses = payload.data;
                }
            })
            .addCase(availableCourses.rejected, (state, { payload }) => {
                // console.log(payload);
                state.member_loading = false;
                state.error = payload.data;
                // throw new Response("Bad Request", payload.data);
            })

            // Get certificates
            .addCase(myCertificates.pending, (state, action) => {
                state.member_loading = true;
            })
            .addCase(myCertificates.fulfilled, (state, { payload }) => {
                state.member_loading = false;
                if (payload.status == 200) {
                    state.pages.my_certificates = payload.data;
                }
            })
            .addCase(myCertificates.rejected, (state, { payload }) => {
                state.member_loading = false;
                state.error = payload.data;
            });
    },
});

export default memberSlice.reducer;
