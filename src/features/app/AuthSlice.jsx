import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";

export const getUser = createAsyncThunk("user/getUser", async () => {
    let api_url = api("user");
    const token =
        Cookies.get("token") == undefined
            ? "9|g5woG0GTCurNNiWj2RIH9b3pnCpIXmUeV21owbbz50ab76f3"
            : Cookies.get("token");
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
    return json;
});

const initialState = {
    user: null,
    user_loading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                state.user = payload;
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.message = payload;
                state.user_loading = false;
            });
    },
});

export default authSlice.reducer;
