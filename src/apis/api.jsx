const env = import.meta.env;

const api_urls = {
    api: "/api/app",
    home: "/api/home",
    page: function (page_name) {
        return `/api/page/${page_name}/show`;
    },
    departments: "/api/departments",
    category_courses: "/api/category_courses",
    category_course: function (id) {
        return `/api/category_courses/${id}`;
    },
    courses: "/api/courses",
    course: function (id) {
        return `/api/courses/${id}`;
    },

    download_contents: "/api/download_contents",
    video_contents: "/api/video_contents",
    faq_contents: "/api/faq_contents",
    user_feedback: "/api/user_feedback",

    // Authentication
    auth_login: "/api/auth/login",
    auth_logout: "/api/auth/logout",
    auth_register: "/api/auth/temp-register",
    auth_send_otp: "/api/auth/send-otp",
    auth_forgot_password: "/api/auth/forgot-password",
    auth_verify_reset_password_link: "/api/auth/verify-reset-password",
    auth_reset_password: "/api/auth/reset-password",
    auth_change_password: function (params) {
        return `/api/auth/member/${params.user_id}/update-password`;
    },
    auth_update_profile_image: function (params) {
        return `/api/auth/member/${params.id}/edit-profile-image`;
    },

    // Authenticated users urls
    user: "/api/auth/user",
    auth_category_courses: "/api/auth/category_courses",
    auth_category_course: function (id) {
        return `/api/auth/category_courses/${id}`;
    },
    auth_course_enroll: function (id) {
        return `/api/auth/courses/${id}/enrollments`;
    },
    auth_course_topic: function (params) {
        return `/api/auth/course/${params.course_id}/course_topic/${params.topic_id}`;
    },
    auth_course_topic_read: function (params) {
        return `/api/auth/course/${params.course_id}/course_topic/${params.topic_id}/read`;
    },
    auth_course_media_convert: function (params) {
        return `/api/auth/course_media/${params.id}/convert`;
    },
    member_dashboard: "/api/auth/member/dashboard",
    member_courses: "/api/auth/member/courses",
    member_available_courses: "/api/auth/member/available_courses",
    member_certificates: "/api/auth/member/certificates",
};

export default function api(api_name, param = null) {
    // Get API domain based on the current app environment
    // console.log(api_name)
    let url =
        env.VITE_APP_ENV == "production"
            ? env.VITE_PROD_APP_URL
            : env.VITE_DEV_APP_URL;
    // console.log(typeof api_urls[api_name], api_urls[api_name]);
    return (
        url +
        (typeof api_urls[api_name] == "function"
            ? api_urls[api_name](param)
            : api_urls[api_name])
    );
}
