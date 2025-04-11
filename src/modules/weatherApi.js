import { API_KEY_WEATHER, setCurrentCoords } from '../app.js';

async function getCoordinates(searchValue = null) {
    let coords = null;
    if (searchValue) {
        try {
            const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${API_KEY_WEATHER}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.length > 0) {
                coords = { lat: data[0].lat, lon: data[0].lon };
            } else {
                throw new Error("Location not found");
            }
        } catch (error) {
            console.error("Error when searching for a location:", error);
            return null;
        }
    } else if ("geolocation" in navigator) {
        try {
            coords = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
                    () => reject(new Error("Geolocation is not allowed"))
                );
            });
        } catch (error) {
            console.error(error.message);
        }
    } else {
        console.warn("Geolocation is not available. We use default coordinates.");
        coords = defaultCoords;
    }

    setCurrentCoords(coords);
    return coords;
}

async function getCorrectPlaceName(lat, lon) {
    try {
        const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY_WEATHER}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        sessionStorage.setItem("currentPlace", data[0].name);
        return data[0].name;
    }
    catch (error) {
        console.error(error);
    }
}

async function fetchWeatherData(endpoint, searchValue) {
    try {
        const coords = await getCoordinates(searchValue);

        const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY_WEATHER}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok || !data) throw new Error("Error during data acquisition.");
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTodayWeather(searchValue) {
    return fetchWeatherData('weather', searchValue);
}

async function getFiveDayForecast(searchValue) {
    const data = await fetchWeatherData('forecast', searchValue);

    try {
        const forecastByDay = {};

        data.list.forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const dayKey = date.toISOString().split('T')[0];

            if (!forecastByDay[dayKey]) {
                forecastByDay[dayKey] = [];
            }
            forecastByDay[dayKey].push(entry);
        });

        const dailyForecast = [];

        Object.keys(forecastByDay).slice(0, 5).forEach(dayKey => {
            const entries = forecastByDay[dayKey];

            let middayEntry = entries.find(e => e.dt_txt.includes("12:00:00"));

            if (!middayEntry) {
                middayEntry = entries.reduce((prev, curr) => {
                    const prevHour = new Date(prev.dt * 1000).getHours();
                    const currHour = new Date(curr.dt * 1000).getHours();
                    return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
                });
            }

            const date = new Date(middayEntry.dt * 1000);

            dailyForecast.push({
                minTemp: Math.round(Math.min(...entries.map(e => e.main.temp_min))),
                maxTemp: Math.round(Math.max(...entries.map(e => e.main.temp_max))),
                weatherDescription: middayEntry.weather[0].description.charAt(0).toUpperCase() + middayEntry.weather[0].description.slice(1),
                humidity: middayEntry.main.humidity,
                pop: Math.round(middayEntry.pop * 100),
                windSpeed: middayEntry.wind.speed,
                pressure: middayEntry.main.pressure,
                sys: middayEntry.sys?.pod || '',
                dateFormatted: date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
                rangeOfDate: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            });
        });

        return dailyForecast;
    } catch (error) {
        console.error("Error in getting the forecast:", error);
        return [];
    }
}

async function getAirQuality(searchValue) {
    return fetchWeatherData('air_pollution', searchValue);
}

async function getTemperaturesByTimeOfDay(searchValue) {
    const data = await fetchWeatherData('forecast', searchValue);

    const dailyTemps = {
        morning: { sum: 0, count: 0 },
        day: { sum: 0, count: 0 },
        evening: { sum: 0, count: 0 },
        night: { sum: 0, count: 0 },
    };

    data.list.forEach(entry => {
        const hour = entry.dt_txt.split(" ")[1];

        if (["06:00:00", "09:00:00"].includes(hour)) { 
            dailyTemps.morning.sum += entry.main.temp;
            dailyTemps.morning.count++;
        }
        if (["12:00:00", "15:00:00"].includes(hour)) {
            dailyTemps.day.sum += entry.main.temp;
            dailyTemps.day.count++;
        }
        if (["18:00:00", "21:00:00"].includes(hour)) {
            dailyTemps.evening.sum += entry.main.temp;
            dailyTemps.evening.count++;
        }
        if (["00:00:00", "03:00:00"].includes(hour)) { 
            dailyTemps.night.sum += entry.main.temp;
            dailyTemps.night.count++;
        }
    });

    for (const key in dailyTemps) {
        dailyTemps[key] = dailyTemps[key].count > 0 
            ? (dailyTemps[key].sum / dailyTemps[key].count).toFixed(1) 
            : null;
    }

    return dailyTemps;
}

async function getProbabilityOfPrecipitation(searchValue) {
    const data = await fetchWeatherData('forecast', searchValue);

    const today = new Date().toISOString().split("T")[0];

    const todayForecasts = data.list.filter(item => 
        item.dt_txt.startsWith(today)
    );

    if (todayForecasts.length === 0) return 0;

    const totalPop = todayForecasts.reduce((sum, item) => sum + item.pop, 0);
    const averagePop = (totalPop / todayForecasts.length) * 100;

    return Math.round(averagePop);
}

export { getCoordinates, getCorrectPlaceName, fetchWeatherData, getTodayWeather,
    getFiveDayForecast, getAirQuality, getTemperaturesByTimeOfDay, getProbabilityOfPrecipitation };