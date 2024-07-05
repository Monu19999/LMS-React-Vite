import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";
import { HTTP_HEADERS } from "@src/app/contents";
import axios from "axios";

export const getAuthHeaders = (has_file = false) => {
    let headers = HTTP_HEADERS;
    // console.log("headers => ", headers);
    const token =
        Cookies.get("token") == undefined ? null : Cookies.get("token");
    // console.log("Cookie Token => ", token);
    // If user is logged in use Bearer token
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // If uploading file change "Content-Type"
    if (has_file) {
        headers["Content-Type"] = "multipart/form-data";
    }
    return headers;
};

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (credentials) => {
        let api_url = api("auth_forgot_password");
        try {
            const response = await fetch(api_url, {
                method: "post",
                headers: HTTP_HEADERS,
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
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (credentials) => {
        let api_url = api("auth_reset_password");
        try {
            const response = await fetch(api_url, {
                method: "post",
                headers: HTTP_HEADERS,
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
    }
);

export const verifyResetPasswordLink = createAsyncThunk(
    "auth/verifyResetPasswordLink",
    async (credentials) => {
        let api_url = api("auth_verify_reset_password_link");
        try {
            const response = await fetch(api_url, {
                method: "post",
                headers: HTTP_HEADERS,
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
    }
);

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (args, { getState }) => {
        let api_url = api("user");
        const state = getState();
        const token = state.auth.token;
        // console.log("token => ", state.auth.token);
        if (!token) {
            return { message: "Unauthenticated." };
        }
        const headers = getAuthHeaders();
        const response = await fetch(api_url, {
            method: "get",
            headers: headers,
            cache: "no-cache",
        });
        const json = await response.json();
        return json;
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        let api_url = api("auth_login");
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.post(api_url, credentials, {
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

export const logout = createAsyncThunk(
    "auth/logout",
    async (args, { navigate }) => {
        let api_url = api("auth_logout");
        try {
            const headers = getAuthHeaders();
            const { data } = await axios.delete(api_url, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response.data);
        }
    }
);

export const register = createAsyncThunk("auth/register", async (userData) => {
    let api_url = api("auth_register");
    try {
        const response = await fetch(api_url, {
            method: "post",
            headers: HTTP_HEADERS,
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
            headers: HTTP_HEADERS,
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
    token: Cookies.get("token") == undefined ? null : Cookies.get("token"),
    user_loading: false,

    errors: [],
    error_message: null,
    is_otp_set: false,
    reset_password_url: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.user_loading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                if (payload.status === 401) {
                    state.message = payload.message;
                    toast(payload.message);
                }
                if (payload.status === 422) {
                    state.message = payload.message;
                    state.errors = payload.errors;
                    toast(payload.message);
                }
                if (payload.status === 200) {
                    Cookies.remove("user", "");
                    state.user = payload?.data?.user;
                    Cookies.set("user", JSON.stringify(payload?.data?.user));
                }
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.error_message = payload;
                state.user_loading = false;
            })

            // Login User
            .addCase(login.pending, (state) => {
                state.user_loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                if (payload.status == 200) {
                    Cookies.set("token", payload.data.token);
                    Cookies.set("user", JSON.stringify(payload.data.user));
                    // payload = payload.data;
                    state.user = payload.data.user;
                    state.token = payload.data.token;
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.user_loading = false;
                if (payload.status == 422) {
                    state.errors = payload.data.errors;
                }
            })

            // Logout User
            .addCase(logout.pending, (state) => {
                state.user_loading = true;
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                if (payload.status == 200) {
                    Cookies.remove("token", "");
                    Cookies.remove("user", "");
                    state.user = null;
                    state.token = null;
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.user_loading = false;
                state.error_message = payload.data.message;
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
                        if (payload.hasOwnProperty("token")) {
                            Cookies.set("token", payload.token);
                            state.token = payload.token;
                        }
                        if (payload.hasOwnProperty("user")) {
                            Cookies.set("user", JSON.stringify(payload.user));
                            state.user = payload.user;
                        }
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
                state.user_loading = true;
                state.error_message = null;
            })
            .addCase(sendOTP.fulfilled, (state, { payload }) => {
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
                state.is_otp_set = false;
                state.user_loading = false;
                state.error_message = action.error.message;
            })

            // Forgot Password
            .addCase(forgotPassword.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                if (
                    payload.hasOwnProperty("status") &&
                    payload.status !== 200
                ) {
                    state.errors = payload.errors;
                    state.error_message = payload.message;
                } else {
                    state.errors = [];
                    state.error_message = null;
                    state.reset_password_url = payload.data.url;
                }
            })
            .addCase(forgotPassword.rejected, (state, { payload }) => {
                state.error_message = payload;
                state.user_loading = false;
            })

            // Reset Password
            .addCase(resetPassword.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.user_loading = false;
                if (
                    payload.hasOwnProperty("status") &&
                    payload.status !== 200
                ) {
                    state.errors = payload.errors;
                    state.error_message = payload.message;
                } else {
                    state.errors = [];
                    state.error_message = null;
                }
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                state.error_message = payload;
                state.user_loading = false;
            })

            // Verify Reset Password Link
            .addCase(verifyResetPasswordLink.pending, (state, { payload }) => {
                state.user_loading = true;
            })
            .addCase(
                verifyResetPasswordLink.fulfilled,
                (state, { payload }) => {
                    state.user_loading = false;
                    if (
                        payload.hasOwnProperty("status") &&
                        payload.status !== 200
                    ) {
                        state.errors = payload.errors;
                        state.error_message = payload.message;
                    } else {
                        state.errors = [];
                        state.error_message = null;
                    }
                }
            )
            .addCase(verifyResetPasswordLink.rejected, (state, { payload }) => {
                state.error_message = payload;
                state.user_loading = false;
            });
    },
});

export const { setMessages } = authSlice.actions;

export default authSlice.reducer;
