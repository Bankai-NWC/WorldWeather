import { getCorrectPlaceName, getTodayWeather, getAirQuality, getForecastSummary } from './modules/weatherApi.js';
import {formatDate, getWeatherImage, calculateDewPoint, calculateUVIndex, scrollToContent, 
    setMenuButtonsClasses, removeFocusOnClick, getSysPeriod } from './modules/utils.js';
import { showForecast, showHomePage, showAboutPage, showContactsPage, initSearchOverlay } from './modules/uiComponents.js';

const API_KEY_WEATHER = '0cc67cc6ca444dc792a1992e8bd9c22d';
const API_KEY_NEWS = 'bf98060bdaceda4070c06f756e2d9619';
const defaultCoords = {lat: 40.73061, lon: -73.93524};

const burgerButton = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const closeButton = document.querySelector('.cross-button');

const homeBtn = document.querySelector(".home-button");
const aboutBtn = document.querySelector(".about-button");
const weatherBtn = document.querySelector(".weather-button");
const contactsBtn = document.querySelector(".contacts-button");

sessionStorage.setItem("currentPlace", null);
sessionStorage.setItem("currentCoords", JSON.stringify({lat: defaultCoords.lat, lon: defaultCoords.lon,}));

removeFocusOnClick();

async function combineWeatherDataForDay(searchValue) {
    const weatherData = await getTodayWeather(searchValue);
    const forecastSummary = await getForecastSummary(searchValue);
    const airQuality = await getAirQuality(searchValue);
    const coords = JSON.parse(sessionStorage.getItem("currentCoords"));
    const sys = getSysPeriod(weatherData.dt, weatherData.timezone);

    const tempForDay = forecastSummary.dailyTemps;
    const pop = forecastSummary.averagePop;
    const dailyForecast = forecastSummary.dailyForecast;

    const data = {
        place: await getCorrectPlaceName(coords.lat, coords.lon) ?? 'Unknown place',
        lat: coords.lat,
        lon: coords.lon,
        date: formatDate(weatherData.dt, weatherData.timezone),
        sys: sys,
        weatherIcon: getWeatherImage(weatherData?.weather[0]?.main, sys),
        description: weatherData?.weather[0]?.description,
        temp: Math.round(weatherData?.main?.temp ?? 0),
        tempFeelsLike: Math.round(weatherData?.main?.feels_like ?? 0),
        morningTemp: Math.round(tempForDay?.morning ?? 0),
        dayTemp: Math.round(tempForDay?.day ?? 0),
        eveningTemp: Math.round(tempForDay?.evening ?? 0),
        nightTemp: Math.round(tempForDay?.night ?? 0),
        tempMax: Math.round(Math.max(weatherData?.main?.temp_max,
            Math.round(tempForDay?.morning),
            Math.round(tempForDay?.day),
            Math.round(tempForDay?.evening),
            Math.round(tempForDay?.night),
        )),
        tempMin: Math.round(Math.min(weatherData?.main?.temp_min,
            Math.round(tempForDay?.morning),
            Math.round(tempForDay?.day),
            Math.round(tempForDay?.evening),
            Math.round(tempForDay?.night),
        )),
        precipitation: pop,
        cloudCover: weatherData?.clouds?.all ?? 0,
        windSpeed: weatherData?.wind?.speed ?? 0,
        windDirection: weatherData?.wind?.deg ?? 0,
        humidity: weatherData?.main?.humidity ?? 0,
        pressure: weatherData?.main?.pressure ?? 0,
        visibility: weatherData?.visibility === 10000
            ? 'No limits'
            : isNaN(weatherData?.visibility / 1000)
              ? '--'
              : Math.round((weatherData?.visibility ?? 0) / 1000),
        dewPoint: calculateDewPoint(weatherData?.main?.temp ?? 0, weatherData?.main?.humidity ?? 0),
        uvIndex: calculateUVIndex(weatherData?.coord?.lat ?? 0,
            weatherData?.clouds?.all ?? 0,
            weatherData?.main?.pressure ?? 0, 
            weatherData?.sys?.sunrise ?? 0, 
            weatherData?.sys?.sunset ?? 0),

        carbonMonoxide: airQuality?.list[0]?.components?.co ?? 0,
        nitrogenDioxide: airQuality?.list[0]?.components?.no2 ?? 0,
        ozone: airQuality?.list[0]?.components?.o3 ?? 0,
        sulphurDioxide: airQuality?.list[0]?.components?.so2 ?? 0,
        fineParticles: airQuality?.list[0]?.components?.pm2_5 ?? 0,
        coarseParticles: airQuality?.list[0]?.components.pm10 ?? 0,

        dailyForecast: dailyForecast,
    };

    return data;
}

function setCurrentCoords(coords) {
    const currentCoords = JSON.parse(sessionStorage.getItem("currentCoords"));

    if (currentCoords.lat !== coords.lat || currentCoords.lon !== coords.lon) {
        sessionStorage.setItem("currentCoords", JSON.stringify({lat: coords.lat, lon: coords.lon,}));
    }
}

function initButtons() {
    document.querySelectorAll(".about-button").forEach(button => {
        button.addEventListener('click', () => {
            const aboutPage = document.querySelector(".about-page");
            const main = document.querySelector(".content");
            if (!aboutPage) {
                setMenuButtonsClasses(aboutBtn, [homeBtn, weatherBtn, contactsBtn]);
                main.replaceChildren();
                showAboutPage();
                scrollToContent(main, "smooth", 200);
            } else {
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".home-button").forEach(button => {
        button.addEventListener('click', async () => {
            const homePage = document.querySelector(".home-page");
            const main = document.querySelector(".content");
            if(!homePage) {
                setMenuButtonsClasses(homeBtn, [aboutBtn, weatherBtn, contactsBtn]);
                main.classList.add("content--loading");
                main.replaceChildren();
                await showHomePage();
                main.classList.remove("content--loading");
                scrollToContent(main, "smooth", 50);
            } else {
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".weather-button").forEach(button => {
        button.addEventListener('click', async () => {
            const weatherPage = document.querySelector(".weather");
            const main = document.querySelector(".content");
            if(!weatherPage) {
                setMenuButtonsClasses(weatherBtn, [homeBtn, aboutBtn, contactsBtn]);
                main.classList.add("content--loading");
                main.replaceChildren();
                await showForecast();
                main.classList.remove("content--loading");
                scrollToContent(main, "smooth", 50);
            } else {
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".contacts-button").forEach(button => {
        button.addEventListener('click', async () => {
            const contactsPage = document.querySelector(".contact-page");
            const main = document.querySelector(".content");
            if(!contactsPage) {
                setMenuButtonsClasses(contactsBtn, [homeBtn, aboutBtn, weatherBtn]);
                main.replaceChildren();
                showContactsPage();
                scrollToContent(main, "smooth", 50);
            } else {
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".about-button-mobile").forEach(button => {
        button.addEventListener('click', () => {
            const aboutPage = document.querySelector(".about-page");
            const main = document.querySelector(".content");
            if (!aboutPage) {
                setMenuButtonsClasses(aboutBtn, [homeBtn, weatherBtn, contactsBtn]);
                main.replaceChildren();
                showAboutPage();
                closeMobileMenu();
                scrollToContent(main, "smooth", 200);
            } else {
                closeMobileMenu();
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".home-button-mobile").forEach(button => {
        button.addEventListener('click', async () => {
            const homePage = document.querySelector(".home-page");
            const main = document.querySelector(".content");
            if(!homePage) {
                setMenuButtonsClasses(homeBtn, [aboutBtn, weatherBtn, contactsBtn]);
                main.classList.add("content--loading");
                main.replaceChildren();
                await showHomePage();
                main.classList.remove("content--loading");
                closeMobileMenu();
                scrollToContent(main, "smooth", 50);
            } else {
                closeMobileMenu();
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".weather-button-mobile").forEach(button => {
        button.addEventListener('click', async () => {
            const weatherPage = document.querySelector(".weather");
            const main = document.querySelector(".content");
            if(!weatherPage) {
                setMenuButtonsClasses(weatherBtn, [homeBtn, aboutBtn, contactsBtn]);
                main.classList.add("content--loading");
                main.replaceChildren();
                await showForecast();
                main.classList.remove("content--loading");
                closeMobileMenu();
                scrollToContent(main, "smooth", 50);
            } else {
                closeMobileMenu();
                scrollToContent(main, "smooth");
            }
        });
    });
    
    document.querySelectorAll(".contacts-button-mobile").forEach(button => {
        button.addEventListener('click', async () => {
            const contactsPage = document.querySelector(".contact-page");
            const main = document.querySelector(".content");
            if(!contactsPage) {
                setMenuButtonsClasses(contactsBtn, [homeBtn, aboutBtn, weatherBtn]);
                main.replaceChildren();
                showContactsPage();
                closeMobileMenu();
                scrollToContent(main, "smooth", 50);
            } else {
                closeMobileMenu();
                scrollToContent(main, "smooth");
            }
        });
    });

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    burgerButton.addEventListener('click', openMobileMenu);
    closeButton.addEventListener('click', closeMobileMenu);

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const openSearchBtn = document.querySelector('.open-search-button');
    openSearchBtn?.addEventListener('click', openSearchOverlay);

    const main = document.querySelector(".content");
    await showForecast();
    initSearchOverlay();
    initButtons();
    scrollToContent(main, "smooth", 50);
});

export { API_KEY_WEATHER, API_KEY_NEWS, combineWeatherDataForDay, setCurrentCoords, scrollToContent,
    contactsBtn, homeBtn, aboutBtn, weatherBtn };