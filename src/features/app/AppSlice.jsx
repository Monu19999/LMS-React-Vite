import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import axios from "axios";
import { getAuthHeaders } from "./AuthSlice";

function setDefaultTheme(theme) {
    if (theme) {
        document.documentElement.classList.add("theme-dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("theme-dark");
        localStorage.removeItem("theme");
    }
    document.getElementById("themeSwitchToggle").checked = theme ? true : false;
}

export const getAppData = createAsyncThunk("app/getAppData", async () => {
    let api_url = api("api");
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
});

export const getDepartments = createAsyncThunk(
    "departments/getDepartments",
    async (data, { rejectWithValue }) => {
        let api_url = api("departments");
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

export const appSlice = createSlice({
    name: "app",
    initialState: {
        lang: "en",
        theme: null,
        affectedElements: [],
        data: [],

        departments: [],
        message: "",
        app_loading: false,
        isSuccess: false,
    },
    reducers: {
        setTheme: (state, action) => {
            let theme = localStorage.getItem("theme");
            setDefaultTheme(theme);
            state.theme = theme;
        },
        updateLang: (state, action) => {
            state.lang = action.payload;
        },
        updateTheme: (state, action) => {
            let themeSwitch = document.getElementById("themeSwitchToggle");
            setDefaultTheme(themeSwitch.checked);
            state.theme = window.localStorage.getItem("theme") ? null : "dark";
        },
        reducers: {
            setTheme: (state, action) => {
                let theme = localStorage.getItem("theme");
                setDefaultTheme(theme);
                state.theme = theme;
            },
            updateLang: (state, action) => {
                state.lang = action.payload;
            },
            updateTheme: (state, action) => {
                let themeSwitch = document.getElementById("themeSwitchToggle");
                setDefaultTheme(themeSwitch.checked);
                state.theme = window.localStorage.getItem("theme")
                    ? null
                    : "dark";
            },
            mobileNavToggle: (state, action) => {
                document.body.classList.contains("is-nav-open")
                    ? document.body.classList.remove("is-nav-open")
                    : document.body.classList.add("is-nav-open");
            },
        },
        changeFontSize: (state, action) => {
            if (action.payload === 0) {
                $("p, h1, h2, h3, h4, h5, h6, li, a").each(function () {
                    var $this = $(this);

                    var origSize = $this.data("orig-size");
                    if (origSize) {
                        $this.css("font-size", origSize);
                    }
                });
            } else {
                $("p, h1, h2, h3, h4, h5, h6, li, a").each(function () {
                    var $this = $(this);

                    if (!$this.data("orig-size")) {
                        $this.data("orig-size", $this.css("font-size"));
                    }
                    var newSize =
                        parseInt($this.css("font-size")) + action.payload;
                    $this.css("font-size", newSize + "px");
                });
            }
        },

        mobileNavToggle: (state, action) => {
            document.body.classList.contains("is-nav-open")
                ? document.body.classList.remove("is-nav-open")
                : document.body.classList.add("is-nav-open");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getDepartments.pending, (state, { payload }) => {
                state.app_loading = true;
            })
            .addCase(getDepartments.fulfilled, (state, { payload }) => {
                state.app_loading = false;
                state.isSuccess = true;
                if (payload.status == 200) {
                    state.departments = payload.data.departments;
                }
            })
            .addCase(getDepartments.rejected, (state, { payload }) => {
                state.app_loading = false;
                state.isSuccess = false;
                // state.message = payload;
            })

            .addCase(getAppData.pending, (state, { payload }) => {
                state.app_loading = true;
            })
            .addCase(getAppData.fulfilled, (state, { payload }) => {
                state.app_loading = false;
                state.isSuccess = true;
                if (payload.status == 200) {
                    state.data = payload.data;
                }
                // state.data = payload;
            })
            .addCase(getAppData.rejected, (state, { payload }) => {
                state.app_loading = false;
                state.isSuccess = false;
                // state.message = payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    updateLang,
    updateTheme,
    setTheme,
    mobileNavToggle,
    departments,
} = appSlice.actions;

export default appSlice.reducer;
