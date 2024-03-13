import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";

const initialState = {
    homedata: {},
    home_loading: false,
};

export const getHomeData = createAsyncThunk("home/getHomeData", async () => {
    const response = await fetch(api("home"), {
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

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomeData.pending, (state, { payload }) => {
                state.home_loading = true;
            })
            .addCase(getHomeData.fulfilled, (state, { payload }) => {
                state.home_loading = false;
                state.homedata = payload;
            })
            .addCase(getHomeData.rejected, (state, { payload }) => {
                state.message = payload;
                state.home_loading = false;
            });
    },
});

export default homeSlice.reducer;
