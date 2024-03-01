const data = {
    development: {
        api: "http://eshiksha.test.com/api/app",
        home: "http://eshiksha.test.com/api/home",
        page: function (page_name) {
            return `http://eshiksha.test.com/api/page/${page_name}/show`;
        },
    },
    production: {
        api: "http://164.100.196.171/learning_mng_sys/api/app",
        home: "http://164.100.196.171/learning_mng_sys/api/home",
        page: function (page_name) {
            return `http://164.100.196.171/learning_mng_sys/api/page/${page_name}/show`;
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
