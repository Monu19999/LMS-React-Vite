import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";

export const getUser = createAsyncThunk(
    "user/getUser",
    async (args, { getState }) => {
        let api_url = api("user");
        const state = getState();
        const token = state.auth.token;
        // console.log("token => ", state.auth.token);
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
    }
);

export const login = createAsyncThunk("auth/login", async (credentials) => {
    let api_url = api("auth_login");
    const response = await fetch(api_url, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        cache: "no-cache",
    });
    const json = await response.json();
    return json.data;
});

const initialState = {
    user: null,
    user_loading: false,
    token: Cookies.get("token") == undefined ? null : Cookies.get("token"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            Cookies.remove("token", "");
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                state.user =
                    payload.message == "Unauthenticated." ? null : payload;
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.message = payload;
                state.user_loading = false;
            })

            // Login User
            .addCase(login.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                Cookies.set("token", payload.token);
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.message = payload;
                state.user_loading = false;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
