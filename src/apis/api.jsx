const data = {
    development: {
        api: "http://eshiksha.test.com/api/app",
        home: "http://eshiksha.test.com/api/home",
        page: function (page_name) {
            return `http://eshiksha.test.com/api/page/${page_name}/show`;
        },
    },
    production: {
        api: "https://raw.githubusercontent.com/Monu19999/LMS-React-Vite/main/src/apis/app.json",
        home: "https://raw.githubusercontent.com/Monu19999/LMS-React-Vite/main/src/apis/home.json",
        page: function (page_name) {
            return `https://raw.githubusercontent.com/Monu19999/LMS-React-Vite/main/src/apis/${page_name}.json`;
        },
    },
};

export default function api(api_name, page_name = null) {
    if (page_name) {
        return data[import.meta.env.VITE_APP_ENV]["page"](page_name);
    } else {
        return data[import.meta.env.VITE_APP_ENV][api_name];
    }
}
