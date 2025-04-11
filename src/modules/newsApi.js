import { API_KEY_NEWS } from "../app.js";

async function fetchNews() {
    try {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?q=weather&category=science&lang=en&max=4&apikey=${API_KEY_NEWS}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok || !data) throw new Error("Error during data acquisition.");

        return data;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export {fetchNews};