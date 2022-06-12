import axios from "axios";

const testAPI = "http://localhost:5000/"; //test api
const liveAPI = "http://tt-api.knowadaysapps.com"; //prod api 

const apiURL = process.env.NODE_ENV === "production" ? liveAPI : testAPI;

const token = "12cf9b50-4671-423a-8b80-491d4df7c66e";

export default axios.create({
    baseURL: apiURL,
    headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        //need to sort this
        Authorization: `Bearer ${token}`,
    },
});