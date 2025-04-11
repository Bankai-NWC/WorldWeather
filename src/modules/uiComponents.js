import { API_KEY_WEATHER, combineWeatherDataForDay, scrollToContent,
    contactsBtn, homeBtn, aboutBtn, weatherBtn } from '../app.js';
import { getWeatherImage, convertAirQualityScale, setMapsButtonClass, setMenuButtonsClasses } from './utils.js';
import { fetchNews } from './newsApi.js';

let map;

//Home page start

async function showHomePage() {
    const main = document.querySelector(".content");
    main.replaceChildren();
    const section = document.createElement("section");
    section.className = "home-page container section";

    const ourSeccessesArticle = createOurSuccessesArticle();
    const whyTrustArticle = await createWhyTrustArticle();
    const newsArticle = await createNewsArticle();

    section.append(ourSeccessesArticle, whyTrustArticle, newsArticle);
    main.append(section);
}

function createOurSuccessesArticle() {
    const articleOurSeccesses = document.createElement("article");
    articleOurSeccesses.className = "our-successes";

    const data = [
        {title: 'weather stations worldwide', value: '40k'},
        {title: 'weather data sources', value: '10+'},
        {title: 'years of experience', value: '5'},
        {title: 'accuracy in short-term forecasts', value: '95%'},
    ];

    data.forEach(elem => {
        const divCard = document.createElement("div");
        divCard.className = "our-successes__card";

        const divContentContainer = document.createElement("div");
        divContentContainer.className = "our-successes__content-container";

        const title = document.createElement('p');
        title.className = "our-successes__title";
        title.textContent = elem.title;

        const value = document.createElement('p');
        value.className = "our-successes__value";
        value.textContent = elem.value;

        divContentContainer.append(value, title);
        divCard.append(divContentContainer);

        articleOurSeccesses.append(divCard);
    });

    return articleOurSeccesses;
}

async function createWhyTrustArticle() {
    const articleWhyTrust = document.createElement("article");
    articleWhyTrust.className = "why-trust";

    const divWhyTrust = document.createElement("div");
    divWhyTrust.className = "why-trust__card";

    const title = document.createElement("h3");
    title.className = "why-trust__title";
    title.textContent = "Why are we trusted?";

    const paragraph = document.createElement("p");
    paragraph.className = "why-trust__text";
    paragraph.textContent = "Our service provides accurate forecasts using data from leading weather agencies. Advanced machine learning algorithms ensure high accuracy of predictions. Intuitive interface and convenient indicators help you quickly get the information you need. We cover millions of cities, providing up-to-date data in any region.";

    divWhyTrust.append(title, paragraph);

    const divButton = document.createElement("div");
    divButton.className = "why-trust__button-container";

    const button = document.createElement("button");
    button.setAttribute("type", "button")
    button.setAttribute("aria-label", "Get the weather");
    button.className = "why-trust__button";
    button.textContent = "weather forecast";
    button.addEventListener('click', async () => {
        const main = document.querySelector(".content");
        setMenuButtonsClasses(weatherBtn, [homeBtn, aboutBtn, contactsBtn]);
        main.classList.add("content--loading");
        main.replaceChildren();
        await showForecast();
        main.classList.remove("content--loading");
        scrollToContent(main, "smooth", 50);
    });
    
    divButton.appendChild(button);

    articleWhyTrust.append(divWhyTrust, divButton);

    return articleWhyTrust;
}

async function createNewsArticle() {
    const news = await fetchNews();

    const articleNews = document.createElement("article");
    articleNews.className = "news";

    const titleNews = document.createElement("h2");
    titleNews.className = "news__title";
    titleNews.textContent = "News";

    const divCards = document.createElement("div");
    divCards.className = "news__cards";

    articleNews.append(titleNews);

    news.articles.forEach(elem => {
        const divCard = document.createElement("div");
        divCard.className = "news__card";

        const divImageContainer = document.createElement("div");
        divImageContainer.className = "news__image-container";

        const image = document.createElement("img");
        image.className = "news__image";
        image.setAttribute("src", `${elem.image}`);
        image.setAttribute("alt", "News image");
        image.setAttribute("width", "256");
        image.setAttribute("height", "196");

        const title = document.createElement("a");
        title.className = "news__link";
        title.textContent = `${elem.title}`;
        title.setAttribute("href", `${elem.url}`);
        title.setAttribute("target", "_blank");
        title.setAttribute("title", `${elem.title}`);

        const sourceText = document.createElement("p");
        sourceText.className = "news__source-text";
        sourceText.textContent = "Source:";

        const sourceLink = document.createElement("a");
        sourceLink.className = "news__source-link";
        sourceLink.textContent = `${elem.source.name}`;
        sourceLink.setAttribute("href", `${elem.source.url}`);
        sourceLink.setAttribute("target", "_blank");

        const divDescription = document.createElement("div");
        divDescription.className = "news__description";

        const paragraph = document.createElement("p");
        paragraph.className = "news__paragraph";
        paragraph.textContent = `${elem.content.slice(0, -13)}`;

        const divSource = document.createElement("div");
        divSource.className = "news__source";

        const divText = document.createElement("div");
        divText.className = "news__text";

        divImageContainer.appendChild(image);
        divSource.append(sourceText, sourceLink);
        divText.append(title, divSource, paragraph);
        divCard.append(divImageContainer, divText);

        articleNews.appendChild(divCard);
    });

    return articleNews;
}

//Home page end

//About page start

function showAboutPage() {
    const main = document.querySelector(".content");
    main.replaceChildren();

    const fragment = document.createDocumentFragment();

    const section = document.createElement("section");
    section.className = "about-page container section";

    const data = [
        {
            title: "Where does the weather data come from?",
            content: "WorldWeather uses the OpenWeather API to retrieve data on current weather, forecasts and air quality. It is one of the world's leading services that collects information from weather stations, satellites and forecast models.",
        },
        {
            title: "How accurate are the forecasts in WorldWeather?",
            content: "Forecasts are based on OpenWeather's advanced algorithms that analyze meteorological data in real time. While no forecast can be 100% accurate, WorldWeather provides the most up-to-date and detailed information possible.",
        },
        {
            title: "How often is the weather data updated?",
            content: "Data is updated in real time and forecasts are adjusted several times a day. This allows users to get the most up-to-date information on weather conditions.",
        },
        {
            title: "Can I see forecasts for multiple cities?",
            content: "Yes, WorldWeather allows you to search weather for different cities around the world.",
        },
    ];

    const aboutUsArticle = createAboutUsArticle();
    const OurMissionArticle = createOurMissionArticle();
    const FAQArticle = createFAQArticle(data);

    section.append(aboutUsArticle, OurMissionArticle, FAQArticle);

    fragment.appendChild(section);

    main.appendChild(fragment);
}

function createAboutUsArticle() {
    const article = document.createElement("article");
    article.className = "about";

    const title = document.createElement("h2");
    title.className = "about__title";
    title.textContent = "About us";

    const paragraph = document.createElement("p");
    paragraph.className = "about__paragraph";
    paragraph.textContent = "WorldWeather was born out of a desire to make weather forecasting accurate, accessible and convenient for everyone. Inspired by the complexity of nature and the possibilities of modern technology, the project team combined advanced meteorological data, machine learning and intuitive design.";
    
    const image = document.createElement("img");
    image.className = "about__image";
    image.setAttribute("src", "./images/webp/images/office.webp");
    image.setAttribute("alt", "Office photo");
    image.setAttribute("width", "427");
    image.setAttribute("height", "283");

    const leftColumn = document.createElement("div");
    leftColumn.className = "about__left-column";
    leftColumn.append(title, paragraph);

    const rightColumn = document.createElement("div");
    rightColumn.className = "about__right-column hidden-mobile";
    rightColumn.append(image);

    article.append(leftColumn, rightColumn);

    return article;
}

function createOurMissionArticle() {
    const article = document.createElement("article");
    article.className = "our-mission";

    const title = document.createElement("h2");
    title.className = "our-mission__title";
    title.textContent = "Our mission";

    const paragraph = document.createElement("p");
    paragraph.className = "our-mission__paragraph";
    paragraph.textContent = "WorldWeather is all about providing accurate real-time weather forecasts in a simple and visually appealing way. We strive to make weather information accessible to everyone, helping people plan their daily activities with confidence. Using OpenWeather's advanced meteorological data, we ensure reliability and intuitiveness. Whether you're checking the forecast for your hometown or researching weather conditions around the world, WorldWeather helps you stay informed.";
    
    article.append(title, paragraph);

    return article;
}

function createFAQArticle(data) {
    const article = document.createElement("article");
    article.className = "FAQ";

    const title = document.createElement("h2");
    title.className = "FAQ__title";
    title.textContent = "FAQ";
    article.appendChild(title);

    data.forEach((item, index) => {
        const accordion = document.createElement("div");
        accordion.className = "FAQ__accordion";
        const details = document.createElement("details");
        details.className = "FAQ__details";
        const summary = document.createElement("summary");
        summary.className = "FAQ__summary";
        const span = document.createElement("span");
        span.className = "FAQ__question";
        span.setAttribute("role", "term");
        span.setAttribute("aria-details", `faq-${index}`);
        span.textContent = item.title;
        const accordionContent = document.createElement("div");
        accordionContent.className = "FAQ__content";
        accordionContent.setAttribute("id", `faq-${index}`);
        accordionContent.setAttribute("role", "definition");
        const accordionContentBody = document.createElement("div");
        accordionContentBody.className = "FAQ__content-body";
        const paragraph = document.createElement("p");
        paragraph.className = "FAQ__paragraph";
        paragraph.textContent = item.content;
        summary.appendChild(span);
        details.appendChild(summary);
        accordionContentBody.append(paragraph);
        accordionContent.append(accordionContentBody);

        accordion.append(details, accordionContent);
        article.append(accordion);
    });

    return article;
}

//About page end

//Weather page start

async function showForecast(searchValue, tab = 1) {
    const data = await combineWeatherDataForDay(searchValue);
    const currentCoords = JSON.parse(sessionStorage.getItem("currentCoords"));

    const main = document.querySelector(".content");
    let weatherSection = main.querySelector(".weather") || createWeatherSection(main);
    let weatherForecastGroup = weatherSection.querySelector(".weather-forecast__group") || createForecastGroup(weatherSection);

    weatherForecastGroup.className = tab === 2 ? "weather-forecast__group daily-forecast" : "weather-forecast__group";
    weatherForecastGroup.replaceChildren();

    switch (tab) {
        case 1:
            renderDefaultForecast(weatherForecastGroup, data, currentCoords);
            createOrUpdateMap(currentCoords, "temp_new");
            break;
        case 2:
            renderDailyForecast(weatherForecastGroup, data);
            break;
        default:
            renderDailyForecast(weatherForecastGroup, data);
    }

    initSearchOverlay();
}

function initSearchOverlay() {
    const overlay = document.querySelector('.mobile-search');
    const closeBtn = overlay?.querySelector('.mobile-search__button-close');
    const input = overlay?.querySelector('.mobile-search__input');
    const submitBtn = overlay?.querySelector('.mobile-search__submit');
    const toggleBtn = document.querySelector('.mobile-search-btn');

    if (!overlay || !closeBtn || !input || !submitBtn || !toggleBtn) return;

    function handleSearch() {
        const searchValue = input.value.trim();

        if (searchValue !== '') {
            showForecast(searchValue);
            sessionStorage.setItem('currentPlace', searchValue);
        } else {
            showForecast();
        }

        input.value = '';
        closeOverlay();
    }

    function openOverlay() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => input.focus(), 100);
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeOverlay);
    submitBtn.addEventListener('click', handleSearch);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
    });

    window.openSearchOverlay = openOverlay;
    window.closeSearchOverlay = closeOverlay;
}

function createWeatherMenu() {
    const header = document.createElement("header");
    header.classList.add("weather-menu__controls");

    const tabsDiv = document.createElement("div");
    tabsDiv.classList.add("weather-menu__tabs");

    const todayButton = document.createElement("button");
    todayButton.classList.add("weather-menu__button", "weather-menu__button--active");
    todayButton.type = "button";
    todayButton.textContent = "Today";
    todayButton.setAttribute("title", "Show today's forecast");
    todayButton.setAttribute("aria-label", "Show today's forecast");
    
    const todaySpan = document.createElement("span");
    todaySpan.classList.add("visually-hidden");
    todaySpan.textContent = "Display today's weather";
    todayButton.appendChild(todaySpan);
    
    const forecastButton = document.createElement("button");
    forecastButton.classList.add("weather-menu__button");
    forecastButton.type = "button";
    forecastButton.textContent = "5-Day Forecast";
    forecastButton.setAttribute("title", "Forecast for the next five days");
    forecastButton.setAttribute("aria-label", "Forecast for the next five days");
    
    const forecastSpan = document.createElement("span");
    forecastSpan.classList.add("visually-hidden");
    forecastSpan.textContent = "Display the weather for 5 days";
    forecastButton.appendChild(forecastSpan);

    todayButton.addEventListener('click', () => {
        todayButton.className = "weather-menu__button weather-menu__button--active";
        forecastButton.className = "weather-menu__button";
    
        showForecast(sessionStorage.getItem("currentPlace"), 1);
    });
    forecastButton.addEventListener('click', () => {
        forecastButton.className = "weather-menu__button weather-menu__button--active";
        todayButton.className = "weather-menu__button";

        if (map) {
            map.off();
            map.remove();
            map = null;
        }
    
        showForecast(sessionStorage.getItem("currentPlace"), 2);
    });
    
    tabsDiv.append(todayButton, forecastButton);
    
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("weather-menu__search");
    searchDiv.setAttribute("title", "Search location");
    searchDiv.setAttribute("aria-label", "Search location");
    
    const input = document.createElement("input");
    input.classList.add("weather-menu__input", "hidden-mobile");
    input.placeholder = "Search Location...";
    input.id = "search-input";
    input.type = "search";
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchInput = document.querySelector(".weather-menu__input");
            const searchValue = searchInput.value;
            todayButton.className = "weather-menu__button weather-menu__button--active";
            forecastButton.className = "weather-menu__button";
    
            if (searchValue === '') {
                showForecast();
            } else {
                showForecast(searchValue);
                sessionStorage.setItem("currentPlace", searchValue);
            }
    
            setMapsButtonClass('temperature');
    
            searchInput.value = '';
        }
    });
    
    const searchButton = document.createElement("button");
    searchButton.classList.add("weather-menu__search-button", "hidden-mobile");
    searchButton.type = "button";
    searchButton.id = "searchButton";
    searchButton.addEventListener('click', () => {
        const searchInput = document.querySelector(".weather-menu__input");
        const searchValue = searchInput.value;
        todayButton.className = "weather-menu__button weather-menu__button--active";
        forecastButton.className = "weather-menu__button";
    
        if (searchValue === '') {
            showForecast();
        } else {
            showForecast(searchValue);
            sessionStorage.setItem("currentPlace", searchValue);
        }
    
        setMapsButtonClass('temperature');
    
        searchInput.value = '';
    });
    
    const searchIcon = document.createElement("img");
    searchIcon.setAttribute("width", "24");
    searchIcon.setAttribute("height", "24");
    searchIcon.setAttribute("src", "./images/svg/icons/search.svg");
    searchIcon.setAttribute("loading", "lazy");
    
    searchButton.appendChild(searchIcon);
    
    const searchSpan = document.createElement("span");
    searchSpan.classList.add("visually-hidden");
    searchSpan.textContent = "Button search";
    searchButton.appendChild(searchSpan);
    
    const mobileSearchButton = document.createElement("button");
    mobileSearchButton.classList.add("weather-menu__search-button", "mobile-search-btn", "visible-mobile");
    mobileSearchButton.type = "button";
    mobileSearchButton.setAttribute("title", "Search location");
    mobileSearchButton.setAttribute("aria-label", "Search location");
    
    const mobileSearchIcon = searchIcon.cloneNode(true);
    mobileSearchButton.appendChild(mobileSearchIcon);
    
    searchDiv.append(input, searchButton, mobileSearchButton);
    
    header.append(tabsDiv, searchDiv);
    return header;
}

function createListItem(blockName, label, value, unit, icon = '', isLast = false, windDirectionIcon = '', windDirection) {
    const listItem = document.createElement("li");
    listItem.className = `${blockName}__item ${isLast ? 'mobile-not-last' : ''}`.trim();

    const labelElement = document.createElement("p");
    labelElement.className = `${blockName}__label`;
    labelElement.textContent = label;
    listItem.appendChild(labelElement);

    if (icon) {
        const container = document.createElement("div");
        container.className = `${blockName}__subtitle-icon`;

        if (windDirectionIcon) {
            const windImg = document.createElement("img");
            windImg.className = `${blockName}__wind-direction`;
            windImg.src = windDirectionIcon;
            windImg.alt = `Wind direction ${windDirection} degrees`;
            windImg.style.transform = `rotate(${windDirection}deg)`;
            windImg.loading = "lazy";
            windImg.width = 24;
            windImg.height = 24;
            windImg.setAttribute("title", "Wind direction");
            container.appendChild(windImg);
        }

        const subtitle = document.createElement("p");
        subtitle.className = `${blockName}__subtitle`;
        subtitle.textContent = `${value}${unit}`;
        container.appendChild(subtitle);

        const iconImg = document.createElement("img");
        iconImg.className = `${blockName}__icon`;
        iconImg.setAttribute("title", label);
        iconImg.src = icon;
        iconImg.alt = label;
        iconImg.loading = "lazy";
        iconImg.width = 24;
        iconImg.height = 24;
        container.appendChild(iconImg);

        listItem.appendChild(container);
    } else {
        const subtitle = document.createElement("p");
        subtitle.className = `${blockName}__subtitle`;
        subtitle.textContent = `${value}${unit}`;
        listItem.appendChild(subtitle);
    }

    return listItem;
}

function createCircleProgressBar(parameter, value, substance) {
    const radius = 50 - (4 / 2);
    const circumference = 2 * Math.PI * radius;

    const strokeDasharray = `${circumference} ${circumference}`;

    const percentage = (value / 200) * 100;
    const offset = circumference - (percentage / 100) * circumference;
    const progressColor = value < 40 ? '#92DE62' :
        value < 80 ? '#F2C858' :
        value < 120 ? '#F4A94C' :
        value < 160 ? '#F0714F' : '#C567EF';
    
    const description = value < 40 ? 'Safe for everyone' :
        value < 80 ? 'Slight discomfort for sensitive people' :
        value < 120 ? 'Harmful to weather-dependent people' :
        value < 160 ? 'Unhealthy air' : 'Dangerous for health';

    const mark = value < 40 ? 'Good' :
        value < 80 ? 'Fair' :
        value < 120 ? 'Moderate' :
        value < 160 ? 'Poor' : 'Very Poor';

    const container = document.createElement("div");
    container.className = `air-quality__item substance-${substance}`;

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-bar__container";
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");
    
    const backgroundCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    backgroundCircle.setAttribute("cx", "50");
    backgroundCircle.setAttribute("cy", "50");
    backgroundCircle.setAttribute("r", radius);
    backgroundCircle.setAttribute("stroke", "#FFFFFF");
    backgroundCircle.setAttribute("stroke-width", "4");
    backgroundCircle.setAttribute("fill", "none");
    
    const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressCircle.setAttribute("transform", "rotate(90, 50, 50)");
    progressCircle.setAttribute("cx", "50");
    progressCircle.setAttribute("cy", "50");
    progressCircle.setAttribute("r", radius);
    progressCircle.setAttribute("stroke", progressColor);
    progressCircle.setAttribute("stroke-width", "4");
    progressCircle.setAttribute("fill", "none");
    progressCircle.setAttribute("stroke-dashoffset", offset);
    progressCircle.setAttribute("stroke-dasharray", strokeDasharray);
    
    svg.appendChild(backgroundCircle);
    svg.appendChild(progressCircle);
    progressContainer.appendChild(svg);
    
    const progressText = document.createElement("div");
    progressText.className = "progress-text__value-substance";
    
    const valueText = document.createElement("p");
    valueText.className = "progress-text__value";
    valueText.textContent = value;
    
    const substanceText = document.createElement("p");
    substanceText.className = "progress-text__substance";
    substanceText.innerHTML = parameter;
    
    progressText.appendChild(valueText);
    progressText.appendChild(substanceText);
    progressContainer.appendChild(progressText);
    
    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "air-quality__description-mark";
    
    const descriptionText = document.createElement("p");
    descriptionText.className = "air-quality__description";
    descriptionText.textContent = description;
    
    const markText = document.createElement("p");
    markText.className = "air-quality__mark";
    markText.textContent = mark;
    
    descriptionContainer.appendChild(descriptionText);
    descriptionContainer.appendChild(markText);
    
    container.appendChild(progressContainer);
    container.appendChild(descriptionContainer);
    
    return container;
}

function currentConditions(data) {
    const article = document.createElement("article");
    article.className = "weather-forecast__item current-conditions";

    const locationWeatherList = document.createElement("ul");
    locationWeatherList.className = "current-conditions__list location-weather";

    const locationItem = document.createElement("li");
    locationItem.className = "current-conditions__item location-date";
    
    const locationTitle = document.createElement("h3");
    locationTitle.className = "current-conditions__location";
    locationTitle.textContent = data.place;
    
    const locationDate = document.createElement("p");
    locationDate.className = "current-conditions__date";
    locationDate.textContent = data.date;
    
    locationItem.appendChild(locationTitle);
    locationItem.appendChild(locationDate);

    const weatherItem = document.createElement("li");
    weatherItem.className = "current-conditions__weather";
    
    const temperature = document.createElement("p");
    temperature.className = "current-conditions__temperature";
    temperature.textContent = `${data.temp}°`;
    
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("title", data.description);
    weatherIcon.src = data.weatherIcon;
    weatherIcon.alt = data.description;
    weatherIcon.width = 120;
    weatherIcon.height = 102;

    weatherItem.appendChild(temperature);
    weatherItem.appendChild(weatherIcon);
    locationWeatherList.appendChild(locationItem);
    locationWeatherList.appendChild(weatherItem);

    function createSection(title, items) {
        const sectionList = document.createElement("ul");
        sectionList.className = "current-conditions__list";
        
        const sectionTitleItem = document.createElement("li");
        sectionTitleItem.className = "current-conditions__item";
        
        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "current-conditions__list-title";
        sectionTitle.textContent = title;
        sectionTitleItem.appendChild(sectionTitle);
        sectionList.appendChild(sectionTitleItem);
        
        items.forEach(item => sectionList.appendChild(item));
        return sectionList;
    }

    const overviewItems = [
        createListItem("current-conditions", "Feels Like", data.tempFeelsLike, "°"),
        createListItem("current-conditions", "Morning Temp", data.morningTemp, "°"),
        createListItem("current-conditions", "Day Temp", data.dayTemp, "°"),
        createListItem("current-conditions", "Evening Temp", data.eveningTemp, "°"),
        createListItem("current-conditions", "Night Temp", data.nightTemp, "°")
    ];

    const airQualityItems = [
        createListItem("current-conditions", "CO", data.carbonMonoxide, " μg/m³"),
        createListItem("current-conditions", "NO₂", data.nitrogenDioxide, " μg/m³"),
        createListItem("current-conditions", "O₃", data.ozone, " μg/m³"),
        createListItem("current-conditions", "PM₂.₅", data.fineParticles, " μg/m³"),
        createListItem("current-conditions", "PM₁₀", data.coarseParticles, " μg/m³")
    ];

    article.appendChild(locationWeatherList);
    article.appendChild(createSection("Overview", overviewItems));
    article.appendChild(createSection("Air quality", airQualityItems));

    return article;
}

function today(data) {
    const article = document.createElement("article");
    article.className = "weather-forecast__item today";

    function createSection(title, items, hiddenMobile = false) {
        const sectionList = document.createElement("ul");
        sectionList.className = "today__list";

        const sectionTitleItem = document.createElement("li");
        sectionTitleItem.className = `today__item ${hiddenMobile ? 'hidden-mobile' : ''}`.trim();
        
        if (title) {
            const sectionTitle = document.createElement("h3");
            sectionTitle.className = "today__list-title";
            sectionTitle.textContent = title;
            sectionTitleItem.appendChild(sectionTitle);
        } else {
            const span = document.createElement("p");
            span.className = "visually-hidden";
            span.textContent = "Empty item";
            sectionTitleItem.appendChild(span);
        }

        sectionList.appendChild(sectionTitleItem);
        items.forEach(item => sectionList.appendChild(item));
        return sectionList;
    }

    const overviewItems = [
        createListItem('today', 'Temp max/min', data.tempMax === data.tempMin ? '--' : `${data.tempMax}°/${data.tempMin}°`, '', './images/svg/icons/temperature.svg'),
        createListItem('today', 'Feels Like', data.tempFeelsLike, '°', './images/svg/icons/temperature.svg'),
        createListItem('today', 'Precipitation', data.precipitation, '%', './images/svg/icons/precepition.svg'),
        createListItem('today', 'Cloud Cover', data.cloudCover, '%', './images/svg/icons/cloud-cover.svg'),
        createListItem('today', 'Wind', data.windSpeed, ' m/s', './images/svg/icons/wind.svg', true, './images/svg/icons/direction.svg', data.windDirection)
    ];

    const airQualityItems = [
        createListItem('today', 'Humidity', data.humidity, '%', './images/svg/icons/humidity.svg'),
        createListItem('today', 'Pressure', data.pressure, ' hPa', './images/svg/icons/pressure.svg'),
        createListItem('today', 'UV Index', data.uvIndex, ' of 13', './images/svg/icons/uv-index.svg'),
        createListItem('today', 'Dew Point', `${data.dewPoint}°`, '', './images/svg/icons/dew-point.svg'),
        createListItem('today', 'Visibility', data.visibility, data.visibility === 'No limits' 
            ? '' 
            : data.visibility === '--' 
            ? '' 
            : ' km', './images/svg/icons/visibility.svg', true)
    ];

    article.appendChild(createSection("Weather for Today", overviewItems));
    article.appendChild(createSection("", airQualityItems, true));

    return article;
}

function airQuality(data) {
    const article = document.createElement("article");
    article.className = "weather-forecast__item air-quality";
    
    const title = document.createElement("h3");
    title.className = "air-quality__title";
    title.textContent = "Air Quality Index";
    article.appendChild(title);
    
    const group = document.createElement("div");
    group.className = "air-quality__group";
    
    group.appendChild(createCircleProgressBar('CO', convertAirQualityScale('CO', data.carbonMonoxide), 'Carbon-Monoxide'));
    group.appendChild(createCircleProgressBar('NO<sub>2</sub>', convertAirQualityScale('NO2', data.nitrogenDioxide), 'Nitrogen-Dioxide'));
    group.appendChild(createCircleProgressBar('O<sub>3</sub>', convertAirQualityScale('O3', data.ozone), 'Ozone'));
    group.appendChild(createCircleProgressBar('SO<sub>2</sub>', convertAirQualityScale('SO2', data.sulphurDioxide), 'Sulphur-Dioxide'));
    group.appendChild(createCircleProgressBar('PM<sub>2.5</sub>', convertAirQualityScale('PM2.5', data.fineParticles), 'Fine-Particles'));
    group.appendChild(createCircleProgressBar('PM<sub>10</sub>', convertAirQualityScale('PM10', data.coarseParticles), 'Coarse-Particles'));
    
    article.appendChild(group);

    return article;
}

function maps(data) {
    const mapsArticle = document.createElement("article");
    mapsArticle.className = "weather-forecast__item maps";

    const mapsGroup = document.createElement("ul");
    mapsGroup.className = "maps__group";

    const mapTypes = [
        { id: "temperature-button", text: "Temperature", hiddenText: "Display temperature map", type: "temp_new" },
        { id: "precipitation-button", text: "Precipitation", hiddenText: "Display precipitation map", type: "precipitation_new" },
        { id: "pressure-button", text: "Pressure", hiddenText: "Display pressure map", type: "pressure_new" },
        { id: "wind-button", text: "Wind", hiddenText: "Display wind speed map", type: "wind_new" }
    ];

    mapTypes.forEach(({ id, text, hiddenText, type }, index) => {
        const listItem = document.createElement("li");
        listItem.className = "maps__item";

        const button = document.createElement("button");
        button.className = `maps__button${index === 0 ? " maps__button--active" : ""}`;
        button.type = "button";
        button.id = id;
        button.textContent = text;
        button.setAttribute("aria-label", `Show ${text.toLowerCase()} map`);

        const span = document.createElement("span");
        span.className = "visually-hidden";
        span.textContent = hiddenText;
        button.appendChild(span);

        button.addEventListener("click", () => {
            createOrUpdateMap(data, type);
            setMapsButtonClass(text.toLowerCase());
        });

        listItem.appendChild(button);
        mapsGroup.appendChild(listItem);
    });

    const mapWrapperDiv = document.createElement("div");
    mapWrapperDiv.className = "map-wrapper";
    mapWrapperDiv.id = "map-wrapper";
    mapWrapperDiv.style.width = "100%";
    mapWrapperDiv.style.height = "100%";

    const mapContainer = document.createElement("div");
    mapContainer.className = "maps__current-map";
    mapContainer.id = "map";
    mapWrapperDiv.appendChild(mapContainer);

    mapsArticle.appendChild(mapsGroup);
    mapsArticle.appendChild(mapWrapperDiv);

    return mapsArticle;
}

function dailyForecast(data) {
    const forecastArticle = document.createElement("article");
    forecastArticle.className = "weather-forecast__item daily-forecast";

    function createForecastCard(date, minTemp, maxTemp, weatherDescription, humidity, precipitation, windSpeed, pressure, sys) {
        const forecastCard = document.createElement("div");
        forecastCard.className = "daily-forecast__card";
    
        const leftColumn = document.createElement("div");
        leftColumn.className = "daily-forecast__leftColumn";
    
        const rightColumn = document.createElement("div");
        rightColumn.className = "daily-forecast__rightColumn";
    
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "daily-forecast__content-wrapper";
    
        const dateElement = document.createElement("h3");
        dateElement.className = "daily-forecast__date";
        dateElement.textContent = date;
    
        const temperatureElement = document.createElement("p");
        temperatureElement.className = "daily-forecast__temp";
        temperatureElement.textContent = `${maxTemp}°/${minTemp}°`;
    
        const weatherDescriptionElement = document.createElement("div");
        weatherDescriptionElement.className = "daily-forecast__item description";
    
        const weatherIcon = document.createElement("img");
        weatherIcon.className = "daily-forecast__image";
        weatherIcon.setAttribute("width", 24);
        weatherIcon.setAttribute("height", 24);
        weatherIcon.setAttribute("src", getWeatherImage(weatherDescription, sys));
        weatherIcon.setAttribute("alt", weatherDescription);
        weatherIcon.setAttribute("title", weatherDescription);
    
        const weatherDescriptionValue = document.createElement("p");
        weatherDescriptionValue.className = "daily-forecast__description-value hidden-mobile";
        weatherDescriptionValue.textContent = weatherDescription;
        weatherDescriptionElement.append(weatherIcon, weatherDescriptionValue);
    
        const rightColumnData = [
            { className: "humidity", value: `${humidity} %`, iconSrc: "./images/svg/icons/humidity.svg" },
            { className: "pop", value: `${precipitation} %`, iconSrc: "./images/svg/icons/precepition.svg" },
            { className: "wind-speed", value: `${windSpeed} m/s`, iconSrc: "./images/svg/icons/wind.svg" },
            { className: "pressure", value: `${pressure} hPa`, iconSrc: "./images/svg/icons/pressure.svg" }
        ];
    
        rightColumnData.forEach(({ className, value, iconSrc }) => {
            const elementContainer = document.createElement("div");
            elementContainer.className = `daily-forecast__item ${className}`;
    
            const icon = document.createElement("img");
            icon.className = "daily-forecast__icon";
            icon.setAttribute("title", className);
            icon.setAttribute("width", 24);
            icon.setAttribute("height", 24);
            icon.setAttribute("src", iconSrc);
            icon.setAttribute("alt", value);
    
            const valueElement = document.createElement("p");
            valueElement.className = `${className}-value`;
            valueElement.textContent = value;
    
            elementContainer.append(icon, valueElement);
            rightColumn.appendChild(elementContainer);
        });
    
        leftColumn.append(temperatureElement, weatherDescriptionElement);
        contentWrapper.append(leftColumn, rightColumn);
        forecastCard.append(dateElement, contentWrapper);
    
        return forecastCard;
    }
    

    forecastArticle.appendChild(createForecastCard(
        data.dateFormatted, data.minTemp, data.maxTemp,
        data.weatherDescription, data.humidity, data.pop,
        data.windSpeed, data.pressure, data.sys
    ));

    return forecastArticle;
}

function createOrUpdateMap(coords, mapType = "temp_new") {
    if (map) {
        map.off();
        map.remove();
        map = null;
    }

    if (!map) {
        map = L.map("map", {
            minZoom: 5,
            maxBounds: [
                [85, -180], 
                [-85, 180]
            ],
            maxBoundsViscosity: 1.0
        }).setView([coords.lat, coords.lon], 10);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            attribution: "© OpenStreetMap",
        }).addTo(map);
    } else {
        map.setView([coords.lat, coords.lon], 10);
    }

    if (map.legend) {
        map.removeControl(map.legend);
    }

    map.legend = L.control({ position: "bottomright" });

    map.legend.onAdd = function () {
        let div = L.DomUtil.create("div", "gradient-legend");
        let legendData = getLegendData(mapType);

        div.innerHTML = `
            <div class="legend-title">${legendData.title}</div>
            <div class="gradient-bar">
                ${legendData.labels.map(label => `<span>${label}</span>`).join("")}
            </div>
            <div class="gradient-line" style="background: ${legendData.gradient};"></div>
        `;
        return div;
    };

    map.legend.addTo(map);

    if (map.weatherLayer) {
        map.removeLayer(map.weatherLayer);
    }

    map.weatherLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY_WEATHER}`,
        { attribution: "© OpenWeatherMap" }
    ).addTo(map);
}

function getLegendData(mapType) {
    const legends = {
        "temp_new": {
            title: "Temperature, °C",
            labels: ["-40°", "-20°", "0°", "20°", "40°"],
            gradient: "linear-gradient(to right, rgb(159, 85, 181) 0%, rgb(44, 106, 187) 8.75%, rgb(82, 139, 213) 12.5%, rgb(103, 163, 222) 18.75%, rgb(142, 202, 240) 25%, rgb(155, 213, 244) 31.25%, rgb(172, 225, 253) 37.5%, rgb(194, 234, 255) 43.75%, rgb(237, 255, 232) 50%, rgb(211, 255, 194) 56.25%, rgb(213, 254, 146) 62.5%, rgb(254, 226, 112) 68.75%, rgb(253, 212, 97) 75%, rgb(244, 168, 94) 82.5%, rgb(244, 129, 89) 87.5%, rgb(244, 104, 89) 93.75%, rgb(244, 76, 73) 100%)"
        },
        "pressure_new": {
            title: "Pressure, hPa",
            labels: ["950", "980", "1010", "1040", "1070"],
            gradient: "linear-gradient(to right, rgb(0, 115, 255) 0%, rgb(0, 170, 255) 8.35059%, rgb(75, 208, 214) 24.9192%, rgb(141, 231, 199) 41.4879%, rgb(176, 247, 32) 49.7722%, rgb(240, 184, 0) 58.0565%, rgb(251, 85, 21) 74.6251%, rgb(243, 54, 59) 91.1938%, rgb(198, 0, 0) 100%)"
        },
        "precipitation_new": {
            title: "Precipitation, mm/h",
            labels: ["0", "1", "2", "5", "10", "20", "50"],
            gradient: "linear-gradient(to right, rgba(150, 150, 170, 0.1) 20%, rgba(20, 20, 255, 0.3) 50%, rgba(20, 20, 255, 0.6) 70%, rgba(20, 20, 255, 0.8) 100%)"
        },
        "wind_new": {
            title: "Wind speed, m/s",
            labels: ["0", "2", "3", "6", "12", "25", "50", "100"],
            gradient: "linear-gradient(to right, rgba(255, 255, 0, 0), rgba(170, 128, 177, 0.11), rgba(170, 128, 177, 0.22), rgba(176, 128, 177, 0.33), rgba(170, 128, 177, 0.66), rgb(164, 123, 170), rgba(116, 76, 172, 0.9), rgb(158, 128, 177))"
        }
    };
    return legends[mapType] || legends["temp_new"];
}

function createWeatherSection(main) {
    const section = document.createElement("section");
    section.className = "weather container section";
    main.appendChild(section);
    return section;
}

function createForecastGroup(weatherSection) {
    const group = document.createElement("div");
    group.className = "weather-forecast__group";
    weatherSection.append(createWeatherMenu(), group);
    return group;
}

function renderDailyForecast(container, data) {
    const locationAndDateContainer = document.createElement("div");
    locationAndDateContainer.className = "daily-forecast__location-date";

    locationAndDateContainer.replaceChildren();

    const locationElement = document.createElement('h3');
    locationElement.className = 'daily-forecast__location';
    locationElement.textContent = data.place;

    const dateRangeElement = document.createElement('p');
    dateRangeElement.className = 'daily-forecast__date-range';
    dateRangeElement.textContent = `${data.dailyForecast[0].rangeOfDate} - ${data.dailyForecast[4].rangeOfDate}`;

    locationAndDateContainer.appendChild(locationElement);
    locationAndDateContainer.appendChild(dateRangeElement);

    container.append(locationAndDateContainer, ...data.dailyForecast.map(dailyForecast));
}

function renderDefaultForecast(container, data, coords) {
    container.append(
        currentConditions(data),
        today(data),
        airQuality(data),
        maps(coords)
    );
}

//Weather page end

//Contact page start

function showContactsPage() {
    const main = document.querySelector(".content");
    main.replaceChildren();
    const section = document.createElement("section");
    section.className = "contact-page container section";

    const articleContact = createContactSection();

    section.appendChild(articleContact);

    main.appendChild(section);
}

function createContactSection() {
    const section = document.createElement("article");
    section.className = "contact";

    const leftColumn = createContactLeftColumn();
    const rightColumn = createContactRightColumn();

    section.append(leftColumn, rightColumn);
    return section;
}

function createContactLeftColumn() {
    const leftColumn = document.createElement("div");
    leftColumn.className = "contact__left-column";

    const contactInfo = createContactInfoBlock();
    const headquarters = createHeadquartersBlock();
    const socials = createSocialBlock();

    leftColumn.append(contactInfo, headquarters, socials);
    return leftColumn;
}

function createContactInfoBlock() {
    const block = document.createElement("div");
    block.className = "contact__info";

    const title = document.createElement("h2");
    title.className = "contact__title";
    title.textContent = "How to contact us?";

    const paragraph = document.createElement("p");
    paragraph.className = "contact__paragraph";
    paragraph.textContent =
        "If you have any questions, just fill in the contact form, and we will answer shortly. You can also reach out to us directly via email or through our social media channels. Our support team is always ready to help with technical issues, feedback, or general inquiries. We value your opinion and strive to respond as quickly as possible to ensure you have the best experience with WorldWeather.";

    block.append(title, paragraph);
    return block;
}

function createHeadquartersBlock() {
    const block = document.createElement("div");
    block.className = "contact__headquarters";

    const title = document.createElement("h3");
    title.className = "contact__title";
    title.textContent = "Headquarters";

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "contact__details";

    const address = document.createElement("p");
    address.className = "contact__paragraph";
    address.textContent = "123 Climate Avenue, Weather City, Earth";

    const emailRow = document.createElement("div");
    emailRow.className = "contact__company-email";

    const emailLabel = document.createElement("p");
    emailLabel.className = "contact__paragraph";
    emailLabel.textContent = "E-mail:";

    const emailLink = document.createElement("a");
    emailLink.className = "contact__email";
    emailLink.href = "mailto:support@worldweather.com";
    emailLink.textContent = "support@worldweather.com";

    emailRow.append(emailLabel, emailLink);
    detailsContainer.append(address, emailRow);
    block.append(title, detailsContainer);

    return block;
}

function createContactRightColumn() {
    const rightColumn = document.createElement("div");
    rightColumn.className = "contact__right-column";

    const formTitle = document.createElement("h2");
    formTitle.className = "contact__title";
    formTitle.textContent = "Get in Touch";

    const form = createContactForm();
    rightColumn.append(formTitle, form);

    return rightColumn;
}

function createContactForm() {
    const form = document.createElement("form");
    form.className = "contact__form";
    form.setAttribute("method", "post");

    const nameEmailRow = document.createElement("div");
    nameEmailRow.className = "contact__name-email";

    const inputName = createInputField("text", "name", "Name", true);
    const inputEmail = createInputField("email", "email", "E-mail", true);
    const inputMessage = createInputField("textarea", "message", "Message", true);

    nameEmailRow.append(inputName, inputEmail);

    const submitButton = document.createElement("button");
    submitButton.className = "contact__button";
    submitButton.type = "submit";
    submitButton.textContent = "Send";
    submitButton.setAttribute("title", "Send message");
    submitButton.setAttribute("aria-label", "Send message");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Your message has been sent successfully!");
    });

    form.append(nameEmailRow, inputMessage, submitButton);
    return form;
}

function createInputField(type, name, placeholder, required) {
    const container = document.createElement("div");
    container.className = "contact__input-container";

    let field;
    if (type === "textarea") {
        field = document.createElement("textarea");
        field.className = "contact__input contact__input--textarea";
        field.rows = 5;
        field.maxLength = 450;
        field.style.resize = "none";
    } else {
        field = document.createElement("input");
        field.className = "contact__input";
        field.setAttribute("autocomplete", name);
        field.type = type;
    }

    field.name = name;
    field.placeholder = placeholder;
    if (required) field.required = true;

    container.appendChild(field);
    return container;
}

function createSocialBlock() {
    const div = document.createElement("div");
    div.className = "contact__socials-group";

    const socialsIcons = [
        {icon: "./images/svg/socials/facebook.svg", name: "facebook", link: "https://www.facebook.com/"},
        {icon: "./images/svg/socials/twitter.svg", name: "twitter", link: "https://x.com/"},
        {icon: "./images/svg/socials/instagram.svg", name: "instagram", link: "https://www.instagram.com/"},
        {icon: "./images/svg/socials/youtube.svg", name: "youtube", link: "https://www.youtube.com/"}];

    socialsIcons.forEach(elem => {
        const link = document.createElement("a");
        link.className = `contact__socials-item ${elem.name}`;
        link.setAttribute("href", elem.link);
        link.setAttribute("target", "_blank");
        link.setAttribute("aria-label", `Visit our ${elem.name}`);

        const icon = document.createElement("img");
        icon.className = "contact__socials-icon";
        icon.setAttribute("src", elem.icon);
        icon.setAttribute("alt", elem.name);
        icon.setAttribute("width", "24");
        icon.setAttribute("height", "24");

        link.appendChild(icon);

        div.appendChild(link);
    });

    return div;
}

//Contact page end

export { showHomePage, createWeatherMenu, createListItem, createCircleProgressBar,
    currentConditions, today, airQuality, maps, dailyForecast,
    createOrUpdateMap, getLegendData, showForecast, showAboutPage, showContactsPage, initSearchOverlay };
