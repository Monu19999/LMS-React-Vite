import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@src/apis/api";

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
    const response = await fetch(api_url, {
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

export const getDepartments = createAsyncThunk(
    "departments/getDepartments",
    async () => {
        let api_url = api("departments");
        const response = await fetch(api_url, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const json = await response.json();
        return json.data;
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
                // console.log(payload);
                state.departments = payload.departments;
                state.isSuccess = true;
            })
            .addCase(getDepartments.rejected, (state, { payload }) => {
                state.message = payload;
                state.app_loading = false;
                state.isSuccess = false;
            })

            .addCase(getAppData.pending, (state, { payload }) => {
                state.app_loading = true;
            })
            .addCase(getAppData.fulfilled, (state, { payload }) => {
                state.app_loading = false;
                state.data = payload;
                state.isSuccess = true;
            })
            .addCase(getAppData.rejected, (state, { payload }) => {
                state.message = payload;
                state.app_loading = false;
                state.isSuccess = false;
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
