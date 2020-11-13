import axios from "axios";

const setAuthToken = (token) => {
    if (token) {
        const FBIdToken = `Bearer ${token}`;
        axios.defaults.headers.common["Authorization"] = FBIdToken;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
