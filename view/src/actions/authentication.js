import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => (dispatch) => {
    axios
        .post("/api/signup", user)
        .then((res) => history.push("/login"))
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const loginUser = (user) => (dispatch) => {
    axios
        .post("/api/login", user)
        .then((res) => {
            const token = res.data.accessToken;
            localStorage.setItem("jwtToken", token);
            if(res.data.role === "student") localStorage.setItem("studentId", res.data.studentId);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem("jwtToken");
    if(localStorage.studentId) localStorage.removeItem("studentId");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push("/login");
};
