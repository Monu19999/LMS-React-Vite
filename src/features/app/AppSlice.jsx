import { createSlice } from "@reduxjs/toolkit";
import $ from "jquery";
var $affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, a");
function setDefaultTheme(theme) {
    if (theme) {
        document.documentElement.classList.add("theme-dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("theme-dark");
        localStorage.removeItem("theme");
    }
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        lang: "en",
        theme: null,
        affectedElements: null,
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
            console.log("setSize");
            state.affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, a");
            state.affectedElements.each(function () {
                var $this = $(this);
                $this.data("orig-size", $this.css("font-size"));
            });
        },
        changeFontSize: (state, action) => {
            console.log("action => ", action);
            console.log("affectedElements => ", $affectedElements);
            if (action.payload === 0) {
                $affectedElements.each(function () {
                    var $this = $(this);
                    $this.css("font-size", $this.data("orig-size"));
                });
            } else {
                $affectedElements.each(function () {
                    var $this = $(this);
                    $this.css(
                        "font-size",
                        parseInt($this.css("font-size")) + action.payload
                    );
                });
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateLang, updateTheme, changeFontSize, setTheme, setSize } =
    appSlice.actions;

export default appSlice.reducer;
