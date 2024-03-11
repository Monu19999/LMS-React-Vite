import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from "jquery";
import api from "@src/apis/api";
var $affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, a");
function setDefaultTheme(theme) {
    // console.log("theme", theme);
    if (theme) {
        document.documentElement.classList.add("theme-dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("theme-dark");
        localStorage.removeItem("theme");
    }
    document.getElementById("themeSwitchToggle").checked = theme ? true : false;
}

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

        departments: [],
        message: "",
        dept_loading: false,
        isDeptSuccess: false,
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

        setSize: (state, action) => {
            // console.log("setSize");
            // state.affectedElements.push();
            $("p, h1, h2, h3, h4, h5, h6, li, a").each(function (e, node) {
                // console.log(node);
                // state.affectedElements.push($(this));
                var $this = $(this);
                $this.data("orig-size", $this.css("font-size"));
            });
        },
        changeFontSize: (state, action) => {
            // console.log("action => ", action);
            // console.log("affectedElements => ", $affectedElements);
            if (action.payload === 0) {
                $("p, h1, h2, h3, h4, h5, h6, li, a").each(function (e, node) {
                    console.log(node.getAttribute("orig-size"));
                    var $this = $(this);
                    $this.css("font-size", $this.data("orig-size"));
                });
            } else {
                $("p, h1, h2, h3, h4, h5, h6, li, a").each(function () {
                    var $this = $(this);
                    $this.css(
                        "font-size",
                        parseInt($this.css("font-size")) + action.payload
                    );
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
                state.dept_loading = true;
            })
            .addCase(getDepartments.fulfilled, (state, { payload }) => {
                state.dept_loading = false;
                // console.log(payload);
                state.departments = payload.departments;
                state.isDeptSuccess = true;
            })
            .addCase(getDepartments.rejected, (state, { payload }) => {
                state.message = payload;
                state.dept_loading = false;
                state.isDeptSuccess = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    updateLang,
    updateTheme,
    changeFontSize,
    setTheme,
    setSize,
    mobileNavToggle,
    departments,
} = appSlice.actions;

export default appSlice.reducer;
