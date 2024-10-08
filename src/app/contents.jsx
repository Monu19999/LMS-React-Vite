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

export const rating_status = Object.freeze({
    rating10: { value: 5, status: "Excellent+" },
    rating9: { value: 4.5, status: "Excellent" },
    rating8: { value: 4, status: "Good+" },
    rating7: { value: 3.5, status: "Good" },
    rating6: { value: 3, status: "Ok+" },
    rating5: { value: 2.5, status: "Ok" },
    rating4: { value: 2, status: "Poor+" },
    rating3: { value: 1.5, status: "Poor" },
    rating2: { value: 1, status: "Useless+" },
    rating1: { value: 0.5, status: "Useless" },
});
