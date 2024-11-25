import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@src/apis/api";
import Cookies from "js-cookie";
import { getAuthHeaders } from "./AuthSlice";
import axios from "axios";

export const getQbmsExam = createAsyncThunk(
    "course/getQbmsExam",
    async (params, { rejectWithValue }) => {
        let api_url = api("auth_exam");

        try {
            if (params) {
                api_url = api_url + `?course=${params.course}`;
            }
            const resp = await fetch(api_url, {
                method: "GET",
                headers: getAuthHeaders(),
            });
            const api_data = await resp.json();
            // console.log(api_data);
            return api_data;
            // .then((response) => response.json())
            // .then((data) => {
            //     console.log(data);
            //     return data;
            // });

            // const headers = getAuthHeaders();
            // const token =
            //     Cookies.get("token") == undefined ? null : Cookies.get("token");
            // if (token) {
            //     headers.Authorization = `Bearer ${token}`;
            //     // headers.mode = "cors";
            // }
            // if (params) {
            //     api_url = api_url + `?course=${params.course}`;
            // }
            // console.log(api_url, headers, params);

            // const { data } = await axios.get(
            //     api_url,
            //     { withCredentials: true },
            //     // params,
            //     { headers }
            // );
            // return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const startQbmsExam = createAsyncThunk(
    "course/startQbmsExam",
    async (params, { rejectWithValue }) => {
        let api_url = api("auth_exam");

        try {
            const headers = getAuthHeaders();
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const { data } = await axios.post(api_url, params, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const updateQbmsExamAnswer = createAsyncThunk(
    "course/updateQbmsExamAnswer",
    async (params, { rejectWithValue }) => {
        let api_url = api("auth_exam_update", params);
        try {
            const headers = getAuthHeaders();
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const { data } = await axios.put(api_url, params, { headers });
            return data;
        } catch (error) {
            const { response } = error;
            return rejectWithValue(response);
        }
    }
);

export const qbmsExamSlice = createSlice({
    name: "qbms_exam",
    initialState: {
        message: "",
        exam_loading: false,
        page: 0,
        count_down: 0,
        count_down_time: null,
        count_attempts: 0,
        can_attempt: false,
        left_hours: 24,
        exam: null,
        question: null,
    },
    reducers: {
        setCountDownTime: (state, action) => {
            let configuration = state?.exam?.category_course?.configuration;

            if (
                state?.exam?.submitted_at == null &&
                configuration?.is_provide_quiz == 1
            ) {
                const exam_time = configuration?.quiz_time || 1; //in minute // get from course configuration
                const start_time = new Date(state?.exam?.created_at).getTime();
                const exam_time_in_ms = exam_time * 60 * 1000; // Convert exam_time to mili seconds
                const current_time = new Date().getTime();

                let left_time = start_time + exam_time_in_ms;
                // if (current_time > left_time) {
                //     state.count_down_time = 0;
                //     state.count_down = 0;
                //     return;
                // }
                // let cdt = current_time + (left_time - current_time);
                let cdt = left_time - current_time;

                state.count_down_time = Math.ceil(cdt / 1000); // Converted into seconds
            } else {
                state.count_down_time = 0;
            }
            qbmsExamSlice.caseReducers.setQuestion(state, action);
        },
        setPage: (state, action) => {
            state.page = action.payload;
            qbmsExamSlice.caseReducers.setQuestion(state, action);
        },
        setQuestion: (state, action) => {
            const exam_questions = state.exam.exam_questions;
            state.question = exam_questions[state.page];
        },
        resetCountDownTime(state, action) {
            state.count_down_time = 0;
        },
        setCountDown(state, action) {
            state.count_down = action.payload;
        },
        updateState: (state, action) => {
            action.payload.map((item) => {
                state[item.key] = item.value;
            });
        },
        setCanAttempts: (state, action) => {
            const exam = action.payload.data.exam;
            const configuration = exam?.category_course?.configuration;
            if (configuration?.no_of_attempts === 0) {
                state.can_attempt = true;
            } else if (
                configuration?.no_of_attempts > 0 &&
                state.count_attempts < configuration?.no_of_attempts
            ) {
                state.can_attempt = true;
            } else if (
                configuration?.no_of_attempts > 0 &&
                state.count_attempts == configuration?.no_of_attempts
            ) {
                state.can_attempt = false;
            }
            qbmsExamSlice.caseReducers.setLeftHours(state, action);
        },
        setLeftHours: (state, action) => {
            const exam = action.payload.data.exam;
            state.left_hours =
                24 -
                Math.floor(
                    (new Date().getTime() -
                        new Date(exam?.submitted_at).getTime()) /
                        (1000 * 60 * 60)
                );
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getQbmsExam.pending, (state, { payload }) => {
                state.exam_loading = true;
            })
            .addCase(getQbmsExam.fulfilled, (state, action) => {
                state.exam_loading = false;
                if (action.payload.status == 200) {
                    if (action?.payload?.data?.exam) {
                        state.exam = action?.payload?.data?.exam;
                        state.count_down = 0;
                        state.count_down_time = null;
                        qbmsExamSlice.caseReducers.setQuestion(state, action);
                    } else {
                        state.exam = null;
                    }
                }
            })
            .addCase(getQbmsExam.rejected, (state, { payload }) => {
                state.exam_loading = false;
            })

            .addCase(startQbmsExam.pending, (state, { payload }) => {
                state.page = 0;
                state.exam_loading = true;
            })
            .addCase(startQbmsExam.fulfilled, (state, action) => {
                state.exam_loading = false;
                if (action.payload.status == 200) {
                    const data = action?.payload?.data;
                    state.exam = data?.exam;
                    state.count_attempts = data?.count_attempts;
                    qbmsExamSlice.caseReducers.setCanAttempts(state, action);
                    qbmsExamSlice.caseReducers.setCountDownTime(state, action);
                }
                // console.log(payload);
            })
            .addCase(startQbmsExam.rejected, (state, { payload }) => {
                state.exam_loading = false;
            })

            .addCase(updateQbmsExamAnswer.pending, (state, { payload }) => {
                state.exam_loading = true;
            })
            .addCase(updateQbmsExamAnswer.fulfilled, (state, action) => {
                if (action.payload.status == 200) {
                    let copy_exam = JSON.parse(JSON.stringify(state.exam));
                    const data = action?.payload?.data;
                    if (data?.exam_question) {
                        let is_attempted = data?.exam_question?.is_attempted;
                        let is_answer_correct =
                            data?.exam_question?.is_answer_correct;

                        let no_of_correct_answers =
                            data?.exam?.no_of_correct_answers;
                        let no_of_questions = data?.exam?.no_of_questions;
                        let percentage = data?.exam?.percentage;
                        let is_passed = data?.exam?.is_passed;

                        copy_exam["exam_questions"][state.page].is_attempted =
                            is_attempted;
                        copy_exam["exam_questions"][
                            state.page
                        ].is_answer_correct = is_answer_correct;
                        copy_exam.no_of_correct_answers = no_of_correct_answers;
                        copy_exam.no_of_questions = no_of_questions;
                        copy_exam.percentage = percentage;
                        copy_exam.is_passed = is_passed;
                    }
                    if (data?.exam) {
                        if (data?.exam?.submitted_at != null) {
                            copy_exam.submitted_at = data?.exam?.submitted_at;
                        }
                        if (data?.exam?.is_time_expired != null) {
                            copy_exam.is_time_expired =
                                data?.exam?.is_time_expired;
                        }
                    }
                    // console.log(data?.count_attempts);

                    state.count_attempts = data?.count_attempts;
                    state.exam = copy_exam;
                }
                state.exam_loading = false;
                // console.log("goto set can attempts");
                qbmsExamSlice.caseReducers.setCanAttempts(state, action);
            })
            .addCase(updateQbmsExamAnswer.rejected, (state, { payload }) => {
                state.exam_loading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    setPage,
    setQuestion,
    setCountDownTime,
    resetCountDownTime,
    setCountDown,
    updateState,
} = qbmsExamSlice.actions;

export default qbmsExamSlice.reducer;
