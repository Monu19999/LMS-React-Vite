import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";
import { getAuthHeaders } from "./AuthSlice";
import axios from "axios";

export const rateCourse = createAsyncThunk(
    "course/rateCourse",
    async (params, { rejectWithValue }) => {
        let api_url = api("auth_rating");
        try {
            const headers = getAuthHeaders();
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");

            const { data } = await axios.post(api_url, params, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const rateSlice = createSlice({
    name: "rating",
    initialState: {
        message: "",
        rate_loading: false,
    },
    reducers: {
        setCourseRating: (state, action) => {
            console.log(state);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(rateCourse.pending, (state, { payload }) => {
                state.rate_loading = true;
            })
            .addCase(rateCourse.fulfilled, (state, action) => {
                console.log(action);

                state.rate_loading = false;
                if (action.payload.status == 200) {
                    // payload.data.rating;
                    // setCourseRating(action.payload.data);
                }
                // console.log(payload);
            })
            .addCase(rateCourse.rejected, (state, { payload }) => {
                state.rate_loading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { setCourseRating } = rateSlice.actions;

export default rateSlice.reducer;
