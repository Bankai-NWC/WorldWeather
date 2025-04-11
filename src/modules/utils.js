function formatDate(dt, timezoneOffset) {
    const localTimestamp = (dt + timezoneOffset) * 1000;
    const date = new Date(localTimestamp);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const weekday = date.toLocaleString("en-US", {
        weekday: "long",
        timeZone: "UTC",
    });
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
    });
    const year = date.getUTCFullYear().toString().slice(-2);

    return `${hours}:${minutes} - ${weekday}, ${day} ${month} ‘${year}`;
}

function getSysPeriod(dt, timezoneOffset) {
    const localTimestamp = (dt + timezoneOffset) * 1000;
    const date = new Date(localTimestamp);
    const hour = date.getUTCHours();

    return hour >= 6 && hour < 20 ? "d" : "n";
}

function getWeatherImage(description, sys) {
    description = description.toLowerCase();

    switch(description) {
        //clear
        case "clear":
            if (sys === "d") {
                return "./images/svg/weather/clear/clear-day.svg"
            }
            return "./images/svg/weather/clear/clear-night.svg";
        case "clear sky":
            if (sys === "d") {
                return "./images/svg/weather/clear/clear-day.svg"
            }
            return "./images/svg/weather/clear/clear-night.svg";

        //clouds
        case "clouds":
            if (sys === "d") {
                return "./images/svg/weather/clouds/few-clouds-day.svg"
            }
            return "./images/svg/weather/clouds/few-clouds-night.svg";
        case "few clouds":
            if (sys === "d") {
                return "./images/svg/weather/clouds/few-clouds-day.svg"
            }
            return "./images/svg/weather/clouds/few-clouds-night.svg";
        case "scattered clouds":
            if (sys === "d") {
                return "./images/svg/weather/clouds/scattered-clouds-day.svg"
            }
            return "./images/svg/weather/clouds/scattered-clouds-night.svg";
        case "broken clouds":
            if (sys === "d") {
                return "./images/svg/weather/clouds/broken-clouds-day.svg"
            }
            return "./images/svg/weather/clouds/scattered-clouds-night.svg";
        case "overcast clouds":
            return "./images/svg/weather/clouds/overcast-clouds.svg";
        
        // Mist
        case "atmosphere":
            return "./images/svg/weather/mist/mist.svg";
        case "mist":
            return "./images/svg/weather/mist/mist.svg";
        case "smoke":
            return "./images/svg/weather/mist/mist.svg";
        case "haze":
            return "./images/svg/weather/mist/mist.svg";
        case "fog":
            return "./images/svg/weather/mist/mist.svg";
        case "sand":
            return "./images/svg/weather/mist/mist.svg";
        case "dust":
            return "./images/svg/weather/mist/mist.svg";
        case "volcanic ash":
            return "./images/svg/weather/mist/mist.svg";
        case "squalls":
            return "./images/svg/weather/mist/tornado.svg";
        case "tornado":
            return "./images/svg/weather/mist/tornado.svg";

        // Snow
        case "snow":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "light snow":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "heavy snow":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "sleet":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "light shower sleet":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "shower sleet":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "light rain and snow":
            return "./images/svg/weather/rain/rain-snow.svg";
        case "rain and snow":
            return "./images/svg/weather/rain/rain-snow.svg";
        case "light shower snow":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "shower snow":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";
        case "heavy shower snow":
            if (sys === "d") {
                return "./images/svg/weather/snow/snow-day.svg"
            }
            return "./images/svg/weather/snow/snow-night.svg";

        //Rain
        case "rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "light rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "moderate rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "heavy intensity rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "very heavy rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "extreme rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "freezing rain":
            return "./images/svg/weather/rain/rain-snow.svg";
        case "light intensity shower rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "shower rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "heavy intensity shower rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        case "ragged shower rain":
            if (sys === "d") {
                return "./images/svg/weather/rain/rain-day.svg"
            }
            return "./images/svg/weather/rain/rain-night.svg";
        
        //Drizzle
        case "drizzle":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "light intensity drizzle":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "heavy intensity drizzle":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "light intensity drizzle rain":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "drizzle rain":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "heavy intensity drizzle rain":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "shower rain and drizzle":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "heavy shower rain and drizzle":
            return "./images/svg/weather/drizzle/drizzle.svg";
        case "shower drizzle":
            return "./images/svg/weather/drizzle/drizzle.svg";

        //Thunderstorm
        case "thunderstorm":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        case "thunderstorm with light rain":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        case "thunderstorm with rain":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        case "thunderstorm with heavy rain":
            return "./images/svg/weather/thunderstorm/heavy-thunderstorm.svg";
        case "light thunderstorm":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        case "heavy thunderstorm":
            return "./images/svg/weather/thunderstorm/heavy-thunderstorm.svg";
        case "ragged thunderstorm":
            return "./images/svg/weather/thunderstorm/heavy-thunderstorm.svg";
        case "thunderstorm with light drizzle":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        case "thunderstorm with drizzle":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        case "thunderstorm with heavy drizzle":
            return "./images/svg/weather/thunderstorm/thunderstorm.svg";
        default:
            if (sys === "d") {
                return "./images/svg/weather/clear/clear-day.svg"
            }
            return "./images/svg/weather/clear/clear-night.svg";
    }
}

function calculateDewPoint(temp, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);

    return Math.round((b * alpha) / (a - alpha));
}

function calculateUVIndex(lat, cloudCover, pressure, sunrise, sunset) {
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < sunrise || currentTime > sunset) {
        return 0;
    }

    const month = new Date().getMonth() + 1;

    let season;
    if ([12, 1, 2].includes(month)) season = "winter";
    else if ([3, 4, 5].includes(month)) season = "spring";
    else if ([6, 7, 8].includes(month)) season = "summer";
    else season = "autumn";

    let baseUV;
    if (Math.abs(lat) < 23) {
        baseUV = season === "summer" ? 11 : season === "winter" ? 9 : 10;
    } else if (Math.abs(lat) < 50) {
        baseUV = season === "summer" ? 8 : season === "winter" ? 2 : 5;
    } else if (Math.abs(lat) < 66) {
        baseUV = season === "summer" ? 6 : season === "winter" ? 1 : 3;
    } else {
        baseUV = season === "summer" ? 4 : season === "winter" ? 0 : 2;
    }

    if (cloudCover > 75) baseUV *= 0.3;
    else if (cloudCover > 50) baseUV *= 0.5;
    else if (cloudCover > 25) baseUV *= 0.7;

    if (pressure < 1000) baseUV *= 1.1;
    else if (pressure > 1020) baseUV *= 0.9;

    const UVIndex = Math.floor((baseUV * 10) / 10);

    return UVIndex
}

function convertAirQualityScale(substance, value) {
    const ranges = {
        "SO2":    [[0, 20], [20, 80], [80, 250], [250, 350], [350, Infinity]],
        "NO2":    [[0, 40], [40, 70], [70, 150], [150, 200], [200, Infinity]],
        "PM10":   [[0, 20], [20, 50], [50, 100], [100, 200], [200, Infinity]],
        "PM2.5":  [[0, 10], [10, 25], [25, 50], [50, 75], [75, Infinity]],
        "O3":     [[0, 60], [60, 100], [100, 140], [140, 180], [180, Infinity]],
        "CO":     [[0, 4400], [4400, 9400], [9400, 12400], [12400, 15400], [15400, Infinity]]
    };

    const categoryIndex = ranges[substance].findIndex(([min, max]) => value >= min && value < max);
    
    if (categoryIndex === -1) return 200;

    const [min, max] = ranges[substance][categoryIndex];
    const minScale = categoryIndex * 40;
    const maxScale = (categoryIndex + 1) * 40;

    if (value <= min) return minScale;
    if (value >= max) return maxScale;

    return Math.round(((value - min) / (max - min)) * 40 + minScale);
}

function setMapsButtonClass(button) {
    switch(button) {
        case 'temperature':
            document.getElementById('temperature-button').className = 'maps__button maps__button--active';
            document.getElementById('precipitation-button').className = ' maps__button';
            document.getElementById('pressure-button').className = ' maps__button';
            document.getElementById('wind-button').className = ' maps__button';
            break;
        case 'precipitation':
            document.getElementById('temperature-button').className = ' maps__button';
            document.getElementById('precipitation-button').className = 'maps__button maps__button--active';
            document.getElementById('pressure-button').className = ' maps__button';
            document.getElementById('wind-button').className = ' maps__button';
            break;
        case 'pressure':
            document.getElementById('temperature-button').className = ' maps__button';
            document.getElementById('precipitation-button').className = ' maps__button';
            document.getElementById('pressure-button').className = 'maps__button maps__button--active';
            document.getElementById('wind-button').className = ' maps__button';
            break;
        case 'wind':
            document.getElementById('temperature-button').className = ' maps__button';
            document.getElementById('precipitation-button').className = ' maps__button';
            document.getElementById('pressure-button').className = ' maps__button';
            document.getElementById('wind-button').className = 'maps__button maps__button--active';
            break;
        default:
            document.getElementById('temperature-button').className = 'maps__button maps__button--active';
            document.getElementById('precipitation-button').className = ' maps__button';
            document.getElementById('pressure-button').className = ' maps__button';
            document.getElementById('wind-button').className = ' maps__button';
    }
}

function scrollToContent(element, scrollType = "smooth", delay = 0) {
    setTimeout(() => {
        element.scrollIntoView({ behavior: scrollType, block: "start" })
    }, delay);
}

function setMenuButtonsClasses(activeBtn, unactiveBtn) {
    activeBtn.classList.toggle("header__menu-link--active");

    unactiveBtn.forEach(element => {
        element.classList.remove("header__menu-link--active");
    });
}

function removeFocusOnClick() {
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function () {
            this.blur();
        });
    });
}

export { formatDate, getWeatherImage, calculateDewPoint, calculateUVIndex, getSysPeriod,
    convertAirQualityScale, setMapsButtonClass, scrollToContent, removeFocusOnClick, 
    setMenuButtonsClasses };