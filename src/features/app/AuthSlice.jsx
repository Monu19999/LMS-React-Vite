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
    try {
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
        if (response.status !== 200) {
            throw new Error("Bad response", {
                cause: json,
            });
        }
        return json.data;
    } catch (error) {
        return error.cause;
    }
});
export const register = createAsyncThunk("auth/register", async (userData) => {
    // console.log(userData);
    let api_url = api("auth_register");
    try {
        const response = await fetch(api_url, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
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
});

const initialState = {
    user:
        Cookies.get("user") == undefined
            ? null
            : JSON.parse(Cookies.get("user")),
    errors: [],
    error_message: null,
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
                state.error_message = payload;
                state.user_loading = false;
            })

            // Login User
            .addCase(login.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload.hasOwnProperty("errors")) {
                    console.log(payload.message);
                    state.errors = payload.errors;
                    state.error_message = payload.message;
                } else {
                    Cookies.set("token", payload.token);
                    Cookies.set("user", JSON.stringify(payload.user));
                    state.user = payload.user;
                    state.token = payload.token;
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.error_message = payload;
                state.user_loading = false;
            })

            //register user
            .addCase(register.pending, (state) => {
                state.user_loading = true;
                state.error_message = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                if (payload.hasOwnProperty("errors")) {
                    console.log(payload.message);
                    state.errors = payload.errors;
                    state.error_message = payload.message;
                } else {
                    Cookies.set("token", payload.token);
                    Cookies.set("user", JSON.stringify(payload.user));
                    state.user = payload.user;
                    state.token = payload.token;
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.user_loading = false;
                state.error_message = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
