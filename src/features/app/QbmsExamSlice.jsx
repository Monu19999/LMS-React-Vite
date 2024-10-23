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
            // console.log(api_url, headers, params);

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
        console.log(params);
        let api_url = api("auth_exam_update", params);
        console.log(api_url);

        try {
            const headers = getAuthHeaders();
            const token =
                Cookies.get("token") == undefined ? null : Cookies.get("token");
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            // console.log(api_url, headers, params);

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
        count_down_time: null,
        exam: {},
    },
    reducers: {
        setCountDownTime: (state, action) => {
            console.log("setCountDownTime");
            if (state?.exam?.submitted_at == null) {
                const exam_time = 20; //in minute // get from course configuration
                const start_time = new Date(state?.exam?.created_at).getTime();
                const exam_time_in_ms = exam_time * 60 * 1000; // Convert exam_time to mili seconds
                const current_time = new Date().getTime();

                let left_time = start_time + exam_time_in_ms;
                state.count_down_time =
                    current_time + (left_time - current_time);
            } else {
                state.count_down_time = 0;
            }
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getQbmsExam.pending, (state, { payload }) => {
                state.exam_loading = true;
            })
            .addCase(getQbmsExam.fulfilled, (state, action) => {
                // console.log(action);

                state.exam_loading = false;
                if (action.payload.status == 200) {
                    if (action?.payload?.data?.exam) {
                        state.exam = action?.payload?.data?.exam;
                    } else {
                        state.exam = {};
                    }
                }
                // console.log(payload);
            })
            .addCase(getQbmsExam.rejected, (state, { payload }) => {
                state.exam_loading = false;
            })

            .addCase(startQbmsExam.pending, (state, { payload }) => {
                state.exam_loading = true;
            })
            .addCase(startQbmsExam.fulfilled, (state, action) => {
                console.log("startQbmsExam");

                state.exam_loading = false;
                if (action.payload.status == 200) {
                    state.exam = action?.payload?.data?.exam;
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
                console.log("updateQbmsExamAnswer");
                console.log(action);

                if (action.payload.status == 200) {
                    let copy_exam = JSON.parse(JSON.stringify(state.exam));
                    console.log("copy_exam");
                    console.log(copy_exam);

                    if (action?.payload?.data?.exam_question) {
                        let is_attempted =
                            action?.payload?.data?.exam_question?.is_attempted;
                        let is_answer_correct =
                            action?.payload?.data?.exam_question
                                ?.is_answer_correct;

                        copy_exam["exam_questions"][state.page].is_attempted =
                            is_attempted;
                        copy_exam["exam_questions"][
                            state.page
                        ].is_answer_correct = is_answer_correct;
                    }
                    if (action?.payload?.data?.exam) {
                        if (action?.payload?.data?.exam?.submitted_at != null) {
                            copy_exam.submitted_at =
                                action?.payload?.data?.exam?.submitted_at;
                        }
                        if (
                            action?.payload?.data?.exam?.is_time_expired != null
                        ) {
                            copy_exam.is_time_expired =
                                action?.payload?.data?.exam?.is_time_expired;
                        }
                    }

                    state.exam = copy_exam;
                }
                state.exam_loading = false;
            })
            .addCase(updateQbmsExamAnswer.rejected, (state, { payload }) => {
                state.exam_loading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { setPage, setCountDownTime } = qbmsExamSlice.actions;

export default qbmsExamSlice.reducer;
