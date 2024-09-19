export const HTTP_STATUS = Object.freeze({
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED",
});

export const HTTP_HEADERS = {
    "access-control-allow-origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json; charset=UTF-8",
};

export const mime_types = Object.freeze([
    "application/video",
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
