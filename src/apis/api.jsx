const env = import.meta.env;

const api_urls = {
    api: "/api/app",
    home: "/api/home",
    page: function (page_name) {
        return `/api/page/${page_name}/show`;
    },
    departments: "/api/departments",
    courses: "/api/courses",
    course: function (id) {
        return `/api/courses/${id}`;
    },

    // Authentication
    auth_login: "/api/auth/login",
    auth_register: "/api/auth/register",

    // Authenticated users urls
    user: "/api/auth/user",
    auth_courses: "/api/auth/courses",
    auth_course: function (id) {
        return `/api/auth/courses/${id}`;
    },
    auth_course_enroll: function (id) {
        return `/api/auth/courses/${id}/enrollments`;
    },
    member_dashboard: "/api/auth/member/dashboard",
    member_courses: "/api/auth/member/courses",
};

export default function api(api_name, param = null) {
    // Get API domain based on the current app environment
    let url =
        env.VITE_APP_ENV == "production"
            ? env.VITE_PROD_APP_URL
            : env.VITE_DEV_APP_URL;
    // console.log(typeof api_urls[api_name]);
    return (
        url +
        (typeof api_urls[api_name] == "function"
            ? api_urls[api_name](param)
            : api_urls[api_name])
    );
}
