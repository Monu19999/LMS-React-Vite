import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";

export const getUser = createAsyncThunk(
    "user/getUser",
    async (args, { getState }) => {
        let api_url = api("user");
        const state = getState();
        const token = state.auth.token;
        // console.log("token => ", state.auth.token);
        if (!token) {
            return { message: "Unauthenticated." };
        }
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
        return json;
    } catch (error) {
        return error.cause;
    }
});

export const logout = createAsyncThunk(
    "auth/logout",
    async (args, { getState }) => {
        let api_url = api("auth_logout");
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await fetch(api_url, {
                method: "delete",
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
            return json;
        } catch (error) {
            return error.cause;
        }
    }
);

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
        if (json.hasOwnProperty("errors")) {
            return json;
        }
        return json.data;
    } catch (error) {
        return error.cause;
    }
});

export const sendOTP = createAsyncThunk("auth/sendOTP", async (userData) => {
    let api_url = api("auth_send_otp");
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
        return json;
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
    is_otp_set: false,
    token: Cookies.get("token") == undefined ? null : Cookies.get("token"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // logout: (state) => {
        //     Cookies.remove("token", "");
        //     Cookies.remove("user", "");
        //     state.user = null;
        //     state.token = null;
        // },
        setMessages: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                let current_state = current(state);
                if (
                    current_state.token &&
                    payload.message == "Unauthenticated."
                ) {
                    Cookies.remove("token", "");
                    Cookies.remove("user", "");
                    state.user = null;
                    state.token = null;
                } else {
                    state.user_loading = false;
                    state.user =
                        payload.message == "Unauthenticated." ? null : payload;
                }
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
                state.user_loading = false;
                if (payload.hasOwnProperty("errors")) {
                    console.log(payload.message);
                    state.errors = payload.errors;
                    state.error_message = payload.message;
                } else {
                    payload = payload.data;
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

            // Logout User
            .addCase(logout.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                console.log(payload);
                Cookies.remove("token", "");
                Cookies.remove("user", "");
                state.user = null;
                state.token = null;
                state.errors = [];
                state.error_message = null;
                state.user_loading = false;
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.error_message = payload;
                state.user_loading = false;
            })

            //register user
            .addCase(register.pending, (state) => {
                state.user_loading = true;
                state.error_message = null;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                if (payload != undefined) {
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
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.user_loading = false;
                state.error_message = action.error.message;
            })

            .addCase(sendOTP.pending, (state) => {
                state.is_otp_set = false;
                console.log("sendOTP.pending");
                state.user_loading = true;
                state.error_message = null;
            })
            .addCase(sendOTP.fulfilled, (state, { payload }) => {
                console.log("sendOTP.fulfilled");
                console.log("payload => ", payload);
                state.user_loading = false;
                if (payload != undefined) {
                    if (payload.hasOwnProperty("errors")) {
                        console.log(payload.message);
                        state.errors = payload.errors;
                        state.error_message = payload.message;
                    } else {
                        state.is_otp_set = true;
                        state.errors = [];
                        state.error_message = null;
                        state.success_message = payload.message;
                    }
                }
            })
            .addCase(sendOTP.rejected, (state, action) => {
                console.log("sendOTP.rejected");
                state.is_otp_set = false;
                state.user_loading = false;
                state.error_message = action.error.message;
            });
    },
});

export const { setMessages } = authSlice.actions;

export default authSlice.reducer;
